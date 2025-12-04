import React from "react";

const testimonials = [
  {
    name: "Alex Johnson",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuChCnkGyIIosRPBDCRmmoYc2bJb3z2G8Rc80GYAUXSd0iUb2iK_OTbYoJY3dJIy7F_fc39-RX4bBU8SA1c9N7pikNBeyi8qLatBH77ohKQkHsxqOGfiHqpxJzIRU5KtnVIdXoTHy-dKvVJ7NmppsLPJ08sjRRlSdUQr5HKme-k5XQTHskmXXtPlmWD-68IwINZqgadd7-d5VQHUrMIpQG4q2AirZH7HoASEnwbgHiVXQtgyov9q-kOiD2S-T6zTfeCAnen2Shdg_cw",
    story: "An absolutely unforgettable experience! GlobeGo handled everything perfectly. The Swiss Alps were magical."
  },
  {
    name: "Maria & David Lee",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaDcmhGFVvqDISlJOwcqqkytj4_RgeQMfKlVJX7Zi-vf5OSUtKe7BdsrBZuMp0i_hkPSRxDrpb9FuYdXeOdkrRHNjD-4XP_neuyJn737Cqutqln4XIhXhv7kYlLEk1ZxLk6ejZ2-Ahcb-BUoGFINJopgDXWzjh7ZKz2JGCFHfSkCRgKeqPBRf3AfMXS7M0UhjxdHqAVNd8POVCCM1cFkIm0_2-ijR47dtLWs_SXHAQbRH8H3itTuWoYjmFfDHb1IBU8ZVD-1Rmq1o",
    story: "Our family trip to the Galapagos was a dream come true. The guides were knowledgeable and so friendly."
  },
  {
    name: "Samantha Chen",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClMIy5ilQbM-YZ-JPb-Ly_IoE4tV8Iu2SOYVHi0RaeDWrJIBjZfSC7bGKaXs9oSva7zxgxRBJERjB9dXgEMaKtyirFM3KtNOzBMydvvb8sGbwylOB2GMBr4JjwlgeY4uZ7CbhGOuS8-repano63bmxTOTyBma_vT8Sj4T_KAtVsIsnWd_grI7daPPgmBON4cPcw-0AJGU5J-soG0LMgcb9l7Rt0xlvLXQYDM_QfsVo1iZQTMUmpW90vSTJWJ4Ypne975rmEId9IUQ",
    story: "I found the perfect budget-friendly trek in the Rockies. Exceeded all my expectations. Highly recommended!"
  },
  {
    name: "John Doe",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuChCnkGyIIosRPBDCRmmoYc2bJb3z2G8Rc80GYAUXSd0iUb2iK_OTbYoJY3dJIy7F_fc39-RX4bBU8SA1c9N7pikNBeyi8qLatBH77ohKQkHsxqOGfiHqpxJzIRU5KtnVIdXoTHy-dKvVJ7NmppsLPJ08sjRRlSdUQr5HKme-k5XQTHskmXXtPlmWD-68IwINZqgadd7-d5VQHUrMIpQG4q2AirZH7HoASEnwbgHiVXQtgyov9q-kOiD2S-T6zTfeCAnen2Shdg_cw",
    story: "Another amazing story from a happy traveler who loves our services!"
  },
];

const Testimonials = () => (
  <section className="py-12 bg-background-dark">
    <h2 className="text-3xl font-bold mb-8 text-center text-white">Traveler Stories</h2>
    <div className="overflow-x-auto horizontal-scroll pb-4 -mx-4 px-4">
      <div className="flex space-x-8">
        {testimonials.map((t, i) => (
          <div key={i} className="flex-shrink-0 w-[300px] md:w-1/3 bg-card-dark p-6 rounded-lg shadow-lg text-center">
            <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
            <p className="text-subtext-dark italic">"{t.story}"</p>
            <h4 className="font-semibold mt-4 text-white">{t.name}</h4>
          </div>
        ))}
      </div>
    </div>
    <div className="text-center mt-8">
      <a className="px-6 py-3 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors" href="#">View All Reviews</a>
    </div>
  </section>
);

export default Testimonials;
