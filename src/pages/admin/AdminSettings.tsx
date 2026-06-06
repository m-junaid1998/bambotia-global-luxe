import { ADMIN_DEMO_CREDENTIALS } from "@/contexts/AdminContext";
import FeedbackSettings from "@/components/FeedbackSettings";

const AdminSettings = () => (
  <div className="space-y-8 max-w-3xl">
    <div>
      <p className="text-[10px] tracking-[0.4em] text-accent mb-2">PREFERENCES</p>
      <h1 className="font-serif text-3xl md:text-4xl text-foreground">Settings</h1>
      <p className="text-sm text-muted-foreground mt-2">Manage your admin profile and store preferences.</p>
    </div>
    <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="font-serif text-xl text-foreground mb-4">Admin Account</h3>
      <dl className="grid sm:grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-[10px] tracking-[0.3em] text-muted-foreground mb-1">EMAIL</dt>
          <dd className="text-foreground">{ADMIN_DEMO_CREDENTIALS.email}</dd>
        </div>
        <div>
          <dt className="text-[10px] tracking-[0.3em] text-muted-foreground mb-1">ROLE</dt>
          <dd className="text-foreground">Owner</dd>
        </div>
      </dl>
    </div>
    <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="font-serif text-xl text-foreground mb-1">Tactile Feedback</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Premium click sounds and vibration for every interaction.
      </p>
      <FeedbackSettings variant="inline" />
    </div>
  </div>
);

export default AdminSettings;