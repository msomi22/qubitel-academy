import os
from pathlib import Path
from google.cloud import texttospeech

# --- 1. Google credentials ---
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = (
    "/Users/pmnjeru/Documents/apps/test-copilot/black-overview-499313-b6-1640b07a5728.json"
)

# --- 2. Output folder ---
out_dir = Path("number_sounds_1_to_100")
out_dir.mkdir(exist_ok=True)

# Do not regenerate files that already exist
OVERWRITE_EXISTING = False

# --- 3. Google TTS setup ---
client = texttospeech.TextToSpeechClient()

voice = texttospeech.VoiceSelectionParams(
    language_code="en-US",
    name="en-US-Neural2-F",
    ssml_gender=texttospeech.SsmlVoiceGender.FEMALE,
)

audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3,
    speaking_rate=0.82,
    pitch=0.0,
)


ONES = {
    0: "",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
}

TEENS = {
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
}

TENS = {
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
}


def number_to_words(number: int) -> str:
    if number == 100:
        return "one hundred"

    if number < 10:
        return ONES[number]

    if number < 20:
        return TEENS[number]

    tens = (number // 10) * 10
    ones = number % 10

    if ones == 0:
        return TENS[tens]

    return f"{TENS[tens]} {ONES[ones]}"


def synthesize_mp3(filename: str, text: str):
    filepath = out_dir / filename

    if filepath.exists() and not OVERWRITE_EXISTING:
        print(f"Skipping existing: {filepath}")
        return

    ssml = f"""
<speak>
  <prosody rate="slow">
    {text}.
  </prosody>
</speak>
""".strip()

    response = client.synthesize_speech(
        input=texttospeech.SynthesisInput(ssml=ssml),
        voice=voice,
        audio_config=audio_config,
    )

    with open(filepath, "wb") as out:
        out.write(response.audio_content)

    print(f"Saved: {filepath} -> {text}")


for number in range(1, 101):
    word = number_to_words(number)

    synthesize_mp3(
        filename=f"{number:03d}.mp3",
        text=word,
    )

print(f"\nAll number files generated in '{out_dir}'")