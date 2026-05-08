import React from 'react';
import { motion } from 'framer-motion';

const memories = [
  {
    id: 1,
    title: "İlk Göz Ağrından...",
    note: "Senin kucağında büyüyen o ilk çocuk olarak, hayata senin şefkatinle başladığım için dünyanın en şanslı evladıyım. İlk kahramanım, canım annem...",
    image: "/family_photo.jpg",
    color: "bg-purple-50"
  },
  {
    id: 2,
    title: "En Büyük Şansımız",
    note: "Kardeşlerimle beraber senin o sonsuz sabrın ve sevginle büyümek, hayatın bize verdiği en güzel hediye. Bizim her adımımızda senin duan ve emeğin var.",
    image: "/family_photo_2.jpg",
    color: "bg-rose-50"
  },
  {
    id: 3,
    title: "En Gururlu Günlerimiz",
    note: "Hayatımızın her dönüm noktasında, en heyecanlı ve gururlu günlerimizde hep en şık ve en güçlü halinle yanımızdaydın. Bizi büyüten o asil duruşun ve sevgin için teşekkürler.",
    image: "/family_photo_3.jpg",
    color: "bg-white"
  },
  {
    id: 4,
    title: "Doğallığın ve Neşenin Adresi",
    note: "Senin o güzel enerjinle her yer bayram yerine dönüyor. Ormanda, evde veya yolda... Nerede olursak olalım, senin yanımızda olman bizim en büyük huzurumuz.",
    image: "/family_photo_4.jpg",
    color: "bg-purple-50"
  },
  {
    id: 5,
    title: "En Tatlı Kaçamaklar",
    note: "Bazen küçük bir hamburger molası, bazen büyük bir akşam yemeği... Seninle paylaştığımız her sofra, senin varlığınla çok daha lezzetli. Ailemizin her anını güzelleştiren canım annemiz.",
    image: "/family_photo_5.jpg",
    color: "bg-white"
  },
  {
    id: 6,
    title: "Ailemiz Büyürken",
    note: "En küçük üyemiz aramıza katıldığında bile senin o bitmek bilmeyen şefkatin hepimizin üzerindeydi. Her geçen gün büyüyen bu koca aile, senin sevginle birbirine kenetleniyor.",
    image: "/family_photo_6.jpg",
    color: "bg-rose-50"
  },
  {
    id: 7,
    title: "En Cool Aile",
    note: "Tüm bu 'Cool' ekibin arkasındaki asıl gizli kahraman sensin. Bizim neşemizin, enerjimizin ve bu güzel beraberliğimizin en büyük mimarı olan canım annem...",
    image: "/family_photo_7.jpg",
    color: "bg-white"
  },
  {
    id: 8,
    title: "Bizim Uğur Böceğimiz",
    note: "Sen bizim hayatımızın asıl uğurusun anne. Senin şans getiren varlığınla her günümüz böyle renkli, her anımız böyle bayram tadında geçiyor.",
    image: "/family_photo_8.jpg",
    color: "bg-purple-50"
  },
  {
    id: 9,
    title: "Yolumuz Hep Aydınlık",
    note: "Geleceğe attığımız her adımda, her başarımızda senin o gurur dolu bakışların bize güç veriyor. Bizim en büyük yol göstericimiz, canım annemiz.",
    image: "/family_photo_9.jpg",
    color: "bg-white"
  }
];

const MemoryItem = ({ memory, index }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center mb-16 md:mb-32 max-w-2xl mx-auto w-full"
    >
      {/* Image Container */}
      <div 
        className="w-full relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.img
          whileHover={{ scale: 1.05, rotate: 0 }}
          transition={{ duration: 0.6 }}
          src={memory.image}
          alt={memory.title}
          className="w-full h-auto object-contain rounded-sm border-[12px] border-white shadow-2xl"
          style={{ rotate: index % 2 === 0 ? '-2deg' : '2deg' }}
        />
        
        {/* Click Overlay Hint */}
        {!isExpanded && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
              Notu Oku ✨
            </p>
          </div>
        )}
      </div>
      
      {/* Expandable Text Content */}
      <div className="w-full text-center mt-6">
        <h3 
          className="text-2xl md:text-3xl font-serif text-slate-800 mb-2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {memory.title}
        </h3>
        
        <motion.div
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-4 pb-2">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed italic px-4">
              "{memory.note}"
            </p>
            <div className="mt-6 flex justify-center">
              <div className="h-[2px] w-12 bg-brand-accent/30"></div>
            </div>
          </div>
        </motion.div>
        
        {/* Subtle Hint for Mobile */}
        {!isExpanded && (
          <motion.p 
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-xs text-brand-accent/60 uppercase tracking-widest mt-2"
          >
            Okumak için tıkla
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

const MemoryTunnel = () => {
  return (
    <section className="py-20 md:py-40 max-w-6xl mx-auto px-6">
      <div className="text-center mb-20 md:mb-32">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-serif text-slate-900 mb-6"
        >
          Bir Ömür Boyu Anılarla...
        </motion.h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Hayatımızın her anını güzelleştiren en mükemmel anneye...
        </p>
      </div>

      <div className="space-y-12">
        {memories.map((memory, index) => (
          <MemoryItem key={memory.id} memory={memory} index={index} />
        ))}
      </div>
    </section>
  );
};

export default MemoryTunnel;
