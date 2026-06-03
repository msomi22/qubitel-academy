export default function SettingsPage() {
  return (
    <main className="page settings-page">
      <section className="glass settings-page-card" aria-labelledby="settings-heading">
        <div className="settings-card-head">
          <div>
            <p className="eyebrow">Workspace</p>
            <h1 id="settings-heading">Settings</h1>
            <p>Workspace preferences will appear here as the product grows.</p>
          </div>
        </div>

        <div className="settings-empty-state" role="status">
          <span className="settings-empty-icon" aria-hidden="true">⚙</span>
          <strong>Preferences are coming soon.</strong>
          <span>No settings have been added yet, but this workspace is ready for future controls.</span>
        </div>
      </section>
    </main>
  );
}
