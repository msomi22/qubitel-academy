import os
from pathlib import Path
from xml.sax.saxutils import escape
from google.cloud import texttospeech

# --- 1. Google credentials ---
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = (
    "/Users/pmnjeru/Documents/apps/test-copilot/black-overview-499313-b6-1640b07a5728.json"
)

# --- 2. Output folder ---
out_dir = Path("phonics_alphabet_exact")
out_dir.mkdir(exist_ok=True)

# Do not regenerate files that already exist
OVERWRITE_EXISTING = False

# --- 3. Google TTS setup ---
client = texttospeech.TextToSpeechClient()

voice = texttospeech.VoiceSelectionParams(
    language_code="en-US",
    name="en-US-Neural2-F", # Changed from en-US-Standard-F"
    ssml_gender=texttospeech.SsmlVoiceGender.FEMALE,
)

audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3,
    speaking_rate=0.82,
    pitch=0.0,
)

PHONEME_FALLBACKS = {
    "fʌ": "fuh",
    "iː": "ee",
    "dʒʌ": "juh",
}

TEXT_ONLY_SOUNDS = {
    "mmmm",
}

# --- 4. Phonics scripts ---
# Format:
# base_name: (letter, sound, example_word, fallback_text)
#
# This creates:
# b_letter.mp3      -> "Letter B"
# b_sound_word.mp3  -> "bu for ball"
sound_scripts = {
    # "a": ("A", "æ", "apple", "a"),
    # "b": ("B", "bu", "ball", "b"),
    # "c": ("C", "ku", "cat", "c"),
    # "d": ("D", "du", "dog", "d"),
    # "e": ("E", "ɛ", "egg", "e"),
    #"f": ("F", "f", "fish", "f"),
    #"g": ("G", "gu", "goat", "g"),
    #"h": ("H", "hʌ", "hat", "h"),
    #"i": ("I", "iː", "ink", "i"),
    #"j": ("J", "dʒu", "jug", "j"),
    #"k": ("K", "ku", "kite", "k"),
    #"l": ("L", "lə", "lion", "l"),
    #"m": ("M", "mmm", "moon", "m"),
    #"n": ("N", "nː", "next", "n"),
    #"o": ("O", "o", "orange", "o"),
    #"p": ("P", "pu", "pot", "p"),
    #"q": ("Q", "kwu", "queen", "q"),
    #"r": ("R", "ɹ", "rabbit", "rrrh"),
    #"s": ("S", "s", "sun", "ssssss"),
    #"t": ("T", "tɪ", "tigger", "tih"),
    #"u": ("U", "ʌ", "umbrella", "uh"),
    #"v": ("V", "vu", "van", "vu"),
    #"w": ("W", "wu", "woman", "wu"),
    #"x": ("X", "sː", "x-ray", "ssss"),
    #"y": ("Y", "jʌ", "yacht", "yuh"),
    #"z": ("Z", "zu", "zebra", "zu"),
}


def phoneme(ipa_sound: str, standard_text: str) -> str:
    return (
        f'<phoneme alphabet="ipa" ph="{escape(ipa_sound)}">'
        f'{escape(standard_text)}'
        f"</phoneme>"
    )


def synthesize_mp3(filename: str, ssml: str):
    filepath = out_dir / filename

    if filepath.exists() and not OVERWRITE_EXISTING:
        print(f"Skipping existing: {filepath}")
        return

    response = client.synthesize_speech(
        input=texttospeech.SynthesisInput(ssml=ssml),
        voice=voice,
        audio_config=audio_config,
    )

    with open(filepath, "wb") as out:
        out.write(response.audio_content)

    print(f"Saved: {filepath}")


# --- 5. Generate separate files ---
for base_name, (letter, sound, word, fallback_text) in sound_scripts.items():

    # File 1: "Letter B"
    letter_ssml = f"""
<speak>
  <prosody rate="slow">
    Letter {escape(letter)}.
  </prosody>
</speak>
""".strip()

    synthesize_mp3(
        filename=f"{base_name}_letter.mp3",
        ssml=letter_ssml,
    )

    # File 2: "bu for ball", "f for fish", etc.
    sound_word_ssml = f"""
    <speak>
      <prosody rate="slow">
        {phoneme(sound, fallback_text)}
        <break time="160ms"/>
        for {escape(word)}.
      </prosody>
    </speak>
    """.strip()

    synthesize_mp3(
        filename=f"{base_name}_sound_word.mp3",
        ssml=sound_word_ssml,
    )

print(f"\nAll files generated in '{out_dir}'")