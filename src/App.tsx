import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Smartphone, 
  Brain, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Target, 
  Lock,
  ChevronDown,
  Star,
  BookOpen,
  AlertTriangle,
  Heart,
  Sparkles,
  Timer,
  XCircle,
  TrendingDown,
  Focus,
  Battery,
  Shield,
  MousePointer2,
  EyeOff,
  CloudRain,
  Sun,
  Moon,
  ArrowDown
} from "lucide-react";
import { useState, useEffect, useRef, ReactNode } from "react";

const CHECKOUT_URL = "https://pay.wiapy.com/trbJtPwaum";

const CTAButton = ({ text, subtext, className = "", onClick, variant = "primary" }: { 
  text: ReactNode; 
  subtext?: string; 
  className?: string; 
  onClick?: () => void;
  variant?: "primary" | "danger" | "white";
}) => {
  const handleClick = () => {
    // Facebook Pixel: Track Events
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'InitiateCheckout');
      (window as any).fbq('track', 'Purchase', { value: 0.00, currency: 'USD' });
    }

    if (onClick) {
      onClick();
    } else {
      window.open(CHECKOUT_URL, '_blank');
    }
  };

  const variants = {
    primary: "bg-brand hover:bg-brand-dark text-black shadow-neon",
    danger: "bg-danger hover:bg-red-600 text-white shadow-danger",
    white: "bg-white hover:bg-zinc-100 text-black shadow-xl"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`w-full max-w-md font-black py-6 px-8 rounded-2xl transition-all flex flex-col items-center justify-center group cursor-pointer ${variants[variant]} ${className}`}
    >
      <span className="text-xl md:text-2xl uppercase tracking-tight flex items-center justify-center gap-2 text-center leading-none">
        {text} <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform shrink-0" />
      </span>
      {subtext && <span className="text-[10px] md:text-xs font-bold opacity-70 mt-2 uppercase tracking-widest">{subtext}</span>}
    </motion.button>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-lg md:text-xl text-zinc-800 hover:text-brand-dark transition-colors"
      >
        {question}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-6 h-6 opacity-50" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-zinc-600 leading-relaxed text-lg">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background color transition: Black -> Transition -> White
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7],
    ["#000000", "#000000", "#F5F5F5", "#FFFFFF"]
  );

  useEffect(() => {
    // Facebook Pixel: Track ViewContent
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'ViewContent');
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="min-h-screen selection:bg-brand selection:text-black transition-colors duration-1000 ease-in-out"
    >
      {/* URGENCY BANNER */}
      <div className="bg-black/90 backdrop-blur-md border-b border-white/10 py-3 px-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2 text-brand">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">OFERTA DE LANÇAMENTO</span>
            <span className="sm:hidden">OFERTA</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 animate-pulse text-danger" />
            <span>EXPIRA EM: <span className="text-danger">{formatTime(timeLeft)}</span></span>
          </div>
        </div>
      </div>

      {/* 1. HERO / HEADLINE */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center text-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/fVrZn0f0/vicio-em-celular.webp" 
            alt="Vício em Celular Background" 
            className="w-full h-full object-cover opacity-50" 
            referrerPolicy="no-referrer"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            loading="eager"
            sizes="(max-width: 768px) 100vw, 1920px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-danger/10 text-danger px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-10 border border-danger/20"
          >
            ⚠️ ALERTA: Isso está destruindo sua saúde mental agora
          </motion.div>

          <h1 className="text-5xl md:text-8xl lg:text-[110px] font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase italic">
            VOCÊ NÃO ESTÁ <br />
            SEM FOCO. <br />
            VOCÊ ESTÁ <br />
            <span className="text-gradient-danger inline-block pr-10 pb-4 overflow-visible">VICIADO</span> <br />
            NO SEU <br />
            CELULAR
          </h1>

          <p className="text-xl md:text-3xl text-zinc-400 max-w-3xl mx-auto font-medium leading-relaxed mb-10">
            O seu celular foi desenhado para te sequestrar. Descubra como reprogramar seu cérebro e recuperar sua vida em apenas 21 dias.
          </p>

          <div className="flex flex-col items-center gap-8">
            <CTAButton 
              text="QUERO SAIR DO VÍCIO AGORA" 
              subtext="Acesso imediato por apenas R$ 9,90" 
              variant="primary"
            />
            <div className="flex flex-wrap justify-center items-center gap-6 text-zinc-500 text-[11px] font-black uppercase tracking-widest">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand" /> Compra 100% Segura</span>
              <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-brand" /> Entrega Imediata</span>
              <span className="flex items-center gap-2"><Star className="w-4 h-4 text-brand" /> 7 Dias de Garantia</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-600 animate-bounce"
        >
          <ArrowDown className="w-10 h-10" />
        </motion.div>
      </section>

      {/* 2. SEÇÃO DE DOR (INTENSIFICADA) */}
      <section className="py-20 px-6 bg-black text-white relative section-lazy">
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 italic">
              Você se reconhece <br /> <span className="text-danger">nessas situações?</span>
            </h2>
            <div className="w-24 h-2 bg-danger mx-auto rounded-full" />
          </div>

          <div className="grid gap-10">
            {[
              { icon: MousePointer2, title: "O 'Scroll' Infinito", desc: "Você abre o Instagram para ver uma coisa e, quando percebe, já se passaram 45 minutos de vídeos inúteis." },
              { icon: EyeOff, title: "A Mente em Outro Lugar", desc: "Você está com sua família ou amigos, mas sua mão coça para checar o celular a cada 2 minutos." },
              { icon: CloudRain, title: "Cansaço Mental Crônico", desc: "Você acorda cansado, passa o dia no 'piloto automático' e vai dormir exausto, mas sem ter produzido nada." },
              { icon: AlertTriangle, title: "A Ansiedade da Notificação", desc: "Qualquer vibração no bolso te faz perder o foco instantaneamente. Você é escravo do barulho." },
              { icon: XCircle, title: "A Culpa do Tempo Perdido", desc: "No fim do dia, você sente um vazio. Sabe que poderia ter feito mais, mas o vício foi mais forte." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col md:flex-row items-start gap-8 p-10 rounded-[40px] bg-zinc-900/40 border border-white/5 hover:border-danger/30 transition-all group"
              >
                <div className="bg-danger/10 p-5 rounded-3xl text-danger group-hover:scale-110 transition-transform shrink-0">
                  <item.icon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-zinc-400 text-xl leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-2xl md:text-3xl font-serif italic text-zinc-500 mb-8">
              "O celular não é mais uma ferramenta. Ele se tornou sua prisão."
            </p>
            <CTAButton text="QUERO ME LIBERTAR AGORA" variant="danger" />
          </div>
        </div>
      </section>

      {/* 3. QUEBRA DE CRENÇA */}
      <section className="py-24 px-6 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-10"
          >
            <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter mb-8 leading-none text-white italic">
              O PROBLEMA <br /> <span className="text-brand">NÃO É VOCÊ</span>
            </h2>
          </motion.div>
          
          <div className="space-y-10 text-2xl md:text-4xl text-zinc-300 leading-tight font-bold">
            <p>Não é falta de força de vontade.</p>
            <p className="text-white">Seu cérebro foi <span className="text-danger underline decoration-4 underline-offset-8">sequestrado</span>.</p>
            <p className="text-zinc-400 text-xl md:text-2xl font-medium leading-relaxed">As redes sociais foram desenhadas por neurocientistas para viciar você. Eles usam o mesmo mecanismo dos caça-níqueis para te manter preso na dopamina barata.</p>
            <p className="text-brand text-3xl md:text-5xl uppercase tracking-tighter">MAS NÓS VAMOS HACKEAR ISSO DE VOLTA.</p>
          </div>
        </div>
      </section>

      {/* 4. APRESENTAÇÃO DO PRODUTO */}
      <section className="py-20 px-6 bg-paper relative overflow-hidden section-lazy">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-dark font-black uppercase tracking-[0.3em] text-sm mb-4 block">A Solução Definitiva</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8 leading-none text-ink italic">
                DESPERTAR <br /> <span className="text-brand-dark">DIGITAL</span>
              </h2>
              <p className="text-2xl text-zinc-600 mb-8 leading-relaxed font-medium">
                Um método simples, prático e 100% aplicável para você retomar o controle da sua mente em apenas 21 dias. Sem teorias complexas, apenas o que funciona.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Protocolo de 21 dias passo a passo",
                  "Técnicas de reprogramação dopaminérgica",
                  "Estratégias para foco inabalável",
                  "Resgate da sua vida analógica"
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="bg-brand-dark/10 p-1 rounded-full">
                      <CheckCircle2 className="w-7 h-7 text-brand-dark" />
                    </div>
                    <span className="text-xl font-bold text-ink">{t}</span>
                  </div>
                ))}
              </div>
              <CTAButton text="QUERO O MÉTODO COMPLETO" className="bg-ink text-brand hover:bg-zinc-800" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-brand/20 blur-[100px] rounded-full opacity-40 animate-pulse" />
              <img 
                src="https://i.ibb.co/m5xGQ0LS/O-DETOX-PRINCIPAL-ipad.webp" 
                alt="Despertar Digital" 
                className="rounded-[50px] shadow-2xl relative z-10 border border-zinc-200 animate-float"
                referrerPolicy="no-referrer"
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 90vw, 600px"
              />
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white p-4 md:p-8 rounded-[20px] md:rounded-[30px] shadow-2xl z-20 border border-zinc-100">
                <div className="flex items-center gap-2 md:gap-4 mb-1 md:mb-2">
                  <div className="flex gap-0.5 md:gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-brand-dark text-brand-dark" />)}
                  </div>
                  <span className="font-black text-ink text-xs md:text-base">4.9/5</span>
                </div>
                <p className="text-zinc-500 font-bold text-[8px] md:text-sm uppercase tracking-widest">+2.300 Alunos</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. BENEFÍCIOS (RESULTADOS EMOCIONAIS) */}
      <section className="py-20 px-6 bg-white section-lazy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-ink italic">
              A Vida Que <br /> <span className="text-brand-dark">Te Espera</span>
            </h2>
            <div className="w-24 h-2 bg-brand-dark mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              { icon: Focus, title: "Foco Natural", desc: "Consiga ler um livro ou trabalhar por horas sem sentir a necessidade agonizante de checar o celular." },
              { icon: Battery, title: "Energia Infinita", desc: "Acabe com o cansaço mental. Acorde com disposição e clareza para realizar seus objetivos." },
              { icon: Heart, title: "Paz e Presença", desc: "Esteja 100% presente com as pessoas que você ama. Reduza a ansiedade e a comparação constante." },
              { icon: Zap, title: "Controle Total", desc: "Você decide quando usar a tecnologia, e não o contrário. Recupere o comando da sua própria mente." }
            ].map((b, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[40px] bg-zinc-50 border border-zinc-100 hover:shadow-2xl hover:shadow-brand/10 transition-all group"
              >
                <div className="w-16 h-16 bg-brand-dark/10 text-brand-dark rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                  <b.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black uppercase mb-6 text-ink tracking-tight">{b.title}</h3>
                <p className="text-zinc-500 text-xl leading-relaxed font-medium">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. O QUE VOCÊ RECEBE */}
      <section className="py-20 px-6 bg-zinc-50 section-lazy">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[80px] p-12 md:p-16 shadow-2xl border border-zinc-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[80px] rounded-full" />
            
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center text-ink italic">
              O Seu Arsenal <br /> <span className="text-brand-dark">Anti-Vício</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative group lg:order-2">
                <div className="absolute -inset-4 bg-brand/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="https://i.ibb.co/R4GLXP12/COMPLETO.png" 
                  alt="Pacote Completo" 
                  className="w-full h-auto rounded-[40px] shadow-2xl relative z-10 mb-12 lg:mb-0"
                  referrerPolicy="no-referrer"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="space-y-10 lg:order-1">
                {[
                  { title: "Ebook Mestre: Despertar Digital", desc: "O protocolo completo de 21 dias com a ciência por trás do detox." },
                  { title: "Cronograma Dia a Dia", desc: "Um mapa exato do que fazer desde o momento que acorda até dormir." },
                  { title: "Checklist de Sobrevivência", desc: "Ferramenta prática para não cair nas armadilhas do algoritmo." },
                  { title: "Guia Prático de Foco", desc: "Técnicas imediatas para dobrar sua produtividade no trabalho." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-brand-dark text-white flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black uppercase text-ink mb-2">{item.title}</h4>
                      <p className="text-zinc-500 text-lg font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BÔNUS (MINI-OFERTAS) */}
      <section className="py-20 px-6 bg-white section-lazy">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-brand-dark/10 text-brand-dark px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">Presentes Exclusivos</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-ink italic">
              Aceleradores <br /> <span className="text-brand-dark">Gratuitos</span>
            </h2>
          </div>

          {/* Bonuses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { 
                title: "Meditação para Iniciantes", 
                desc: "Acalme sua mente em 5 minutos e elimine o ruído digital.", 
                val: "R$ 47,90", 
                img: "https://i.ibb.co/gb800fDZ/meditac-ao.png"
              },
              { 
                title: "Pôr do Sol Digital", 
                desc: "O protocolo exato para desligar o cérebro e dormir como um bebê.", 
                val: "R$ 47,90", 
                img: "https://i.ibb.co/tM58p03z/bonus-3.png"
              },
              { 
                title: "Versão para Impressão", 
                desc: "Todo o processo para você imprimir, marcar e seguir à vontade.", 
                val: "R$ 47,90", 
                img: "https://i.ibb.co/TqcLQghf/capa-despertar-digital-sozinha-ok.png"
              }
            ].map((bonus, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -12 }}
                className="bg-[#0A0A0A] rounded-[45px] overflow-hidden border border-white/10 flex flex-col shadow-2xl group relative h-full"
              >
                <div className="aspect-square overflow-hidden relative bg-[#050505] flex items-center justify-center p-10 shrink-0">
                  <img 
                    src={bonus.img} 
                    alt={bonus.title} 
                    className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer" 
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-6 left-6 bg-[#00FF00] text-black font-black px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest z-20 shadow-[0_0_15px_rgba(0,255,0,0.3)]">
                    Bônus {i+1}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-black uppercase text-white mb-3 leading-tight tracking-tight">{bonus.title}</h3>
                  <p className="text-zinc-400 mb-6 font-medium text-base opacity-80 leading-relaxed">{bonus.desc}</p>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-1">Valor</span>
                      <span className="text-zinc-500 line-through font-bold">{bonus.val}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-[#00FF00] uppercase font-black tracking-widest mb-1">Oferta</span>
                      <span className="text-[#00FF00] font-black text-3xl uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(0,255,0,0.2)]">GRÁTIS</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-zinc-950 p-12 rounded-[50px] border border-white/10 inline-block max-w-3xl shadow-2xl"
            >
              <h4 className="text-3xl md:text-4xl font-black uppercase text-white mb-4 tracking-tighter italic">
                Economia Real de <span className="text-[#00FF00]">R$ 143,70</span>
              </h4>
              <p className="text-zinc-400 font-bold text-xl leading-relaxed">
                Você recebe todo esse arsenal de bônus <span className="text-white underline decoration-[#00FF00] decoration-4 underline-offset-4">sem pagar um centavo a mais</span> por isso.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. PROVA SOCIAL */}
      <section className="py-20 px-6 bg-zinc-50 section-lazy">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center text-ink italic">
            Vidas <span className="text-brand-dark">Despertas</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "Carlos M.", text: "Eu passava 7 horas por dia no celular. Em 15 dias com o Despertar Digital, reduzi para 1h30 e minha produtividade no trabalho triplicou. É libertador." },
              { name: "Juliana R.", text: "Finalmente consegui ler um livro inteiro sem me distrair. A sensação de ter o controle da minha mente de volta não tem preço." },
              { name: "Ricardo S.", text: "O protocolo de sono mudou meu humor. Acordo com energia e sem aquela névoa mental de quem fica rolando feed até 2 da manhã." }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[40px] shadow-xl border border-zinc-100 relative"
              >
                <div className="absolute -top-6 left-12 w-12 h-12 bg-brand-dark rounded-2xl flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <p className="text-zinc-600 text-xl leading-relaxed mb-10 italic font-medium">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center font-black text-zinc-400">
                    {t.name[0]}
                  </div>
                  <p className="font-black uppercase text-ink tracking-widest">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. OFERTA (ANCORAGEM FORTE) */}
      <section className="py-24 px-6 bg-white relative overflow-hidden section-lazy">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.03)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-10 max-w-lg mx-auto"
            >
              <img 
                src="https://i.ibb.co/R4GLXP12/COMPLETO.png" 
                alt="Oferta Completa" 
                className="w-full h-auto rounded-3xl shadow-2xl border border-zinc-100"
                referrerPolicy="no-referrer"
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            <p className="text-zinc-400 font-black uppercase tracking-[0.4em] text-2xl line-through mb-4">De R$ 97,00</p>
            <p className="text-ink font-black uppercase tracking-tighter text-3xl mb-6 italic">Por apenas</p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-5xl font-black text-ink mt-8">R$</span>
              <span className="text-[120px] md:text-[220px] font-black text-brand-dark leading-none tracking-tighter">9,90</span>
            </div>
          </div>

          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-danger text-white px-10 py-4 rounded-2xl inline-block font-black uppercase tracking-widest text-sm md:text-lg mb-16 shadow-2xl shadow-danger/40"
          >
            🔥 OFERTA POR TEMPO LIMITADO • PODE SAIR DO AR AGORA
          </motion.div>

          <div className="flex flex-col items-center gap-10">
            <CTAButton text="QUERO RECUPERAR MEU FOCO" subtext="Aproveite o preço promocional de R$ 9,90" className="max-w-lg" />
            <div className="flex flex-wrap justify-center gap-8 text-zinc-400 text-[11px] font-black uppercase tracking-widest">
              <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-brand-dark" /> Compra Segura</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-dark" /> Acesso Imediato</span>
              <span className="flex items-center gap-2"><Shield className="w-5 h-5 text-brand-dark" /> 7 Dias de Garantia</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. GARANTIA */}
      <section className="py-20 px-6 bg-zinc-50 section-lazy">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 p-10 bg-white rounded-[60px] border border-zinc-200 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl rounded-full" />
            <div className="shrink-0 relative">
              <div className="absolute inset-0 bg-brand/20 blur-2xl rounded-full animate-pulse" />
              <Shield className="w-40 h-40 text-brand-dark relative z-10" />
            </div>
            <div className="relative z-10">
              <h3 className="text-4xl font-black uppercase mb-6 text-ink italic tracking-tight">Risco Zero: <br /> <span className="text-brand-dark">7 Dias de Garantia</span></h3>
              <p className="text-zinc-600 text-xl leading-relaxed font-medium">
                Eu confio tanto no Despertar Digital que o risco é todo meu. Se em 7 dias você não sentir que sua mente está mais limpa e focada, eu devolvo cada centavo. Sem perguntas, sem burocracia. Basta um e-mail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 text-center text-ink italic">
            Perguntas <br /> <span className="text-brand-dark">Frequentes</span>
          </h2>
          <div className="space-y-4">
            <FAQItem 
              question="Funciona mesmo para quem é muito viciado?" 
              answer="Sim! O método ataca a raiz neuroquímica do vício (dopamina). Ele foi desenhado justamente para quem sente que não tem mais controle sobre o próprio tempo." 
            />
            <FAQItem 
              question="Quanto tempo leva para ver resultados?" 
              answer="Muitos alunos relatam uma clareza mental absurda já nas primeiras 48 horas de aplicação do protocolo inicial." 
            />
            <FAQItem 
              question="Preciso ter muita disciplina?" 
              answer="Não. O método cria um ambiente onde a disciplina se torna o caminho mais fácil, em vez de você ter que lutar contra sua vontade o tempo todo." 
            />
            <FAQItem 
              question="Como eu recebo o conteúdo?" 
              answer="O acesso é 100% digital e imediato. Assim que o pagamento for confirmado, você receberá um e-mail com o link para baixar todos os materiais." 
            />
          </div>
        </div>
      </section>

      {/* 12. CTA FINAL (EMOCIONAL) */}
      <section className="py-24 px-6 bg-ink text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter mb-12 leading-none italic">
            A DECISÃO <br /> <span className="text-brand">É SUA</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-[30px] bg-white/5 border border-white/10 text-left opacity-40 hover:opacity-60 transition-opacity"
            >
              <p className="text-zinc-500 font-black mb-6 uppercase tracking-widest text-sm">Caminho A</p>
              <p className="text-2xl font-bold leading-tight">Continuar escravo do algoritmo, perdendo horas da sua vida, sentindo-se ansioso, cansado e sem futuro.</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-[30px] bg-brand/10 border border-brand/40 text-left shadow-2xl shadow-brand/10"
            >
              <p className="text-brand font-black mb-6 uppercase tracking-widest text-sm">Caminho B</p>
              <p className="text-2xl font-black leading-tight">Investir R$ 9,90 para retomar o controle da sua mente, do seu foco e da sua vida hoje mesmo.</p>
            </motion.div>
          </div>

          <p className="text-3xl md:text-4xl font-serif italic mb-16 text-zinc-400">
            "Ou você domina a tecnologia, ou ela domina você."
          </p>

          <div className="flex justify-center">
            <CTAButton text="QUERO RECUPERAR MEU FOCO" subtext="Aproveite o preço de R$ 9,90 enquanto está no ar" variant="primary" className="max-w-xl" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-black text-zinc-600 text-center border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center gap-8 mb-10">
            <ShieldCheck className="w-8 h-8 opacity-20" />
            <Lock className="w-8 h-8 opacity-20" />
            <CheckCircle2 className="w-8 h-8 opacity-20" />
          </div>
          <p className="text-sm uppercase tracking-[0.3em] font-black mb-6 text-zinc-500">Despertar Digital © 2026</p>
          <p className="text-xs max-w-2xl mx-auto leading-relaxed opacity-50 font-medium">
            Este produto não garante resultados. Qualquer estratégia de mudança de hábito requer esforço e consistência. Os depoimentos são de usuários reais que aplicaram o método. Este site não é afiliado ao Facebook ou Google.
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
