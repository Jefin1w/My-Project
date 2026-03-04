import { motion } from "framer-motion";
import { Shield, BookOpen, Plus, Save, Trash2, Lock, UserPlus, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { subjects } from "@/data/subjects";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const AdminPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [adminEmails, setAdminEmails] = useState<{ id: string; email: string; added_by: string | null }[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.id || "");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [modelUrl, setModelUrl] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  useEffect(() => {
    if (!user) return;
    // Check admin status by trying to read admin_emails (RLS will block non-admins)
    supabase.from("admin_emails").select("id, email, added_by").then(({ data, error }) => {
      if (error || !data) {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
        setAdminEmails(data);
      }
    });
  }, [user]);

  const fetchAdmins = async () => {
    const { data } = await supabase.from("admin_emails").select("id, email, added_by");
    if (data) setAdminEmails(data);
  };

  const addAdmin = async () => {
    const email = newAdminEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      toast({ title: "Invalid email", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("admin_emails").insert({ email, added_by: user?.email || "unknown" });
    if (error) {
      toast({ title: "Failed to add admin", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Admin added!", description: `${email} is now an admin.` });
      setNewAdminEmail("");
      fetchAdmins();
    }
  };

  const removeAdmin = async (id: string, email: string) => {
    if (adminEmails.length <= 1) {
      toast({ title: "Cannot remove", description: "At least one admin must remain.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("admin_emails").delete().eq("id", id);
    if (error) {
      toast({ title: "Failed to remove", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Admin removed", description: `${email} is no longer an admin.` });
      fetchAdmins();
    }
  };

  const addQuestion = () => setQuizQuestions((q) => [...q, { question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
  const removeQuestion = (idx: number) => setQuizQuestions((q) => q.filter((_, i) => i !== idx));
  const updateQuestion = (idx: number, field: string, value: any) => setQuizQuestions((q) => q.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));
  const updateOption = (qIdx: number, optIdx: number, value: string) => setQuizQuestions((q) => q.map((item, i) => i === qIdx ? { ...item, options: item.options.map((o, j) => (j === optIdx ? value : o)) } : item));
  const handleSave = () => toast({ title: "Content Saved!", description: `Lesson "${lessonTitle}" has been saved.` });

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-24 text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-4 w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full gradient-gold mx-auto">
              <Lock className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">Access Denied</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Signed in as <span className="text-foreground">{user?.email}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">This account is not authorized for admin access.</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-gold"><Shield className="h-5 w-5 text-primary-foreground" /></div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Signed in as {user?.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Admin Management */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-foreground">
                <Users className="h-4 w-4 text-primary" />Admin Accounts
              </h2>
              <div className="space-y-2 mb-4">
                {adminEmails.map((a) => (
                  <div key={a.id} className="flex items-center justify-between rounded-lg bg-secondary/30 px-3 py-2">
                    <div>
                      <span className="text-sm text-foreground">{a.email}</span>
                      {a.added_by && <span className="ml-2 text-xs text-muted-foreground">added by {a.added_by}</span>}
                    </div>
                    <button onClick={() => removeAdmin(a.id, a.email)} className="text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} placeholder="new-admin@example.com" className="flex-1" />
                <Button onClick={addAdmin} size="sm" className="gap-1.5"><UserPlus className="h-3.5 w-3.5" />Add</Button>
              </div>
            </div>

            {/* Subject selector */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-base font-semibold text-foreground">Select Subject</h2>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => { const Icon = s.icon; return (
                  <button key={s.id} onClick={() => setSelectedSubject(s.id)} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${selectedSubject === s.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                    <Icon className="h-4 w-4" />{s.name}
                  </button>
                ); })}
              </div>
            </div>

            {/* Lesson details */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-foreground"><BookOpen className="h-4 w-4 text-primary" />Lesson Details</h2>
              <div className="space-y-4">
                <div><label className="mb-1.5 block text-sm font-medium text-foreground">Title</label><Input value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} placeholder="e.g., Electric Charges and Fields" /></div>
                <div><label className="mb-1.5 block text-sm font-medium text-foreground">Content</label><Textarea value={lessonContent} onChange={(e) => setLessonContent(e.target.value)} placeholder="Write the lesson content here..." rows={8} /></div>
                <div><label className="mb-1.5 block text-sm font-medium text-foreground">3D Model URL (.glb)</label><Input value={modelUrl} onChange={(e) => setModelUrl(e.target.value)} placeholder="https://example.com/model.glb" /></div>
              </div>
            </div>

            {/* Quiz */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-base font-semibold text-foreground">Quiz Questions</h2>
                <Button onClick={addQuestion} size="sm" variant="outline" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Add Question</Button>
              </div>
              <div className="space-y-6">
                {quizQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="rounded-lg border border-border bg-secondary/20 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-primary">Question {qIdx + 1}</span>
                      {quizQuestions.length > 1 && <button onClick={() => removeQuestion(qIdx)} className="text-destructive hover:text-destructive/80"><Trash2 className="h-4 w-4" /></button>}
                    </div>
                    <Input value={q.question} onChange={(e) => updateQuestion(qIdx, "question", e.target.value)} placeholder="Enter the question..." className="mb-3" />
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <input type="radio" name={`correct-${qIdx}`} checked={q.correctAnswer === optIdx} onChange={() => updateQuestion(qIdx, "correctAnswer", optIdx)} className="accent-primary" />
                          <Input value={opt} onChange={(e) => updateOption(qIdx, optIdx, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + optIdx)}`} className="text-sm" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleSave} className="w-full gap-2" size="lg"><Save className="h-4 w-4" />Save Content</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
