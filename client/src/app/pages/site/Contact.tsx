import * as React from "react";
import { motion } from "motion/react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  fetchContactInfo,
  submitContactForm,
  type ContactFormPayload,
  type ContactInfo,
} from "../../lib/site-api";

const initialFormState: ContactFormPayload = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "ขอคำแนะนำก่อนซื้อ",
  message: "",
};

export function Contact() {
  const [contactInfo, setContactInfo] = React.useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [infoError, setInfoError] = React.useState<string | null>(null);
  const [formState, setFormState] = React.useState<ContactFormPayload>(initialFormState);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    async function loadContactInfo() {
      try {
        setIsLoading(true);
        setInfoError(null);
        const data = await fetchContactInfo();
        if (!isMounted) return;
        setContactInfo(data);
      } catch (loadError) {
        if (!isMounted) return;
        setInfoError(loadError instanceof Error ? loadError.message : "ไม่สามารถโหลดข้อมูลติดต่อได้");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadContactInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(null);

      const response = await submitContactForm(formState);

      setSubmitSuccess(response.message);
      setFormState(initialFormState);
    } catch (submitFailure) {
      setSubmitError(submitFailure instanceof Error ? submitFailure.message : "ไม่สามารถส่งข้อความได้ในตอนนี้");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-medium text-sky-700">ติดต่อเรา</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">มีคำถามเรื่องสินค้า?</h1>
          <p className="mt-2 text-lg leading-relaxed text-slate-600">
            ส่งข้อความหาเราได้เลย ไม่ว่าจะถามเรื่องการใช้งาน นัดเข้ามาดูสินค้า หรือขอข้อมูลหน้าร้านเพิ่มเติม
            <br />
            ทีมงานพร้อมช่วยแนะนำให้ตรงกับสิ่งที่คุณกำลังหา
          </p>
        </motion.div>

        {infoError && (
          <div className="mx-auto mb-8 max-w-5xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
            โหลดข้อมูลติดต่อไม่สำเร็จ: {infoError}
          </div>
        )}

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">ข้อมูลติดต่อและหน้าร้าน</h2>

              {isLoading || !contactInfo ? (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-600">
                  กำลังโหลดข้อมูลติดต่อจากระบบหลังบ้าน
                </div>
              ) : (
                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-950">ที่ตั้งหน้าร้าน</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-950">เบอร์ติดต่อ</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-950">อีเมลและโซเชียล</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{contactInfo.email}</p>
                      <p className="mt-2 text-sm text-slate-500">
                        LINE: {contactInfo.line} · Facebook: {contactInfo.facebook}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-950">เวลาเปิดทำการ</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          <a
  href="https://maps.app.goo.gl/eetA7fVon8KZHB9R7"
  target="_blank"
  rel="noopener noreferrer"
  className="group block"
>
  <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <img
      src="https://a-techpattaya.aksorn.ac.th/a-tech2020/wp-content/uploads/2024/06/q1.jpg"
      alt="ตำแหน่งร้านและเส้นทางการเดินทาง"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

    <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-white/30 bg-white/88 p-5 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:bg-white/92">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-slate-950">
            ดูตำแหน่งร้านบนแผนที่
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            เปิด Google Maps เพื่อดูเส้นทางการเดินทางและตำแหน่งร้าน
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
          เปิดแผนที่
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m13 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  </div>
</a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14 }}>
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl md:p-10">
              <div className="absolute right-0 top-0 h-56 w-56 rounded-bl-full bg-sky-50" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-slate-950">ส่งข้อความหาเรา</h2>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">ชื่อ</label>
                      <input
                        name="firstName"
                        type="text"
                        required
                        value={formState.firstName}
                        onChange={handleChange}
                        placeholder="เช่น มายด์"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">นามสกุล</label>
                      <input
                        name="lastName"
                        type="text"
                        required
                        value={formState.lastName}
                        onChange={handleChange}
                        placeholder="เช่น ศรีสุข"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">อีเมล</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="yourname@example.com"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">หัวข้อที่ต้องการสอบถาม</label>
                    <select
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    >
                      <option>ขอคำแนะนำก่อนซื้อ</option>
                      <option>สอบถามเรื่องสินค้า</option>
                      <option>สอบถามเรื่องออเดอร์</option>
                      <option>นัดดูสินค้าที่หน้าร้าน</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">ข้อความ</label>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="ส่งข้อความหาเรา"
                      className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <Button type="submit" size="lg" className="h-14 w-full rounded-xl text-base" disabled={isSubmitting}>
                    {isSubmitting ? "กำลังส่งข้อความ..." : "ส่งข้อความหาเรา"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>

                  {submitSuccess && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                      {submitSuccess}
                    </div>
                  )}

                  {submitError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                      {submitError}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
