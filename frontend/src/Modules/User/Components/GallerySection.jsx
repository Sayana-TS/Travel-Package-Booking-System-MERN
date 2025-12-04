import React from "react";

const images = [
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXua1UFKHBOOHV2bzkLPBgBVCQuMAP78EfvvKADGBxI_FfH1zD3w8KC6HcLvgFdj8rAcZvUtNd23d7FPLfyZ9hU74T6mUSpM1_AyKjWKs7gCv80ONg0FKmACWsUYcoVLTQr6tIF8xm_k8GR8q_GdDJyOigI82Jfcr4vBOdT3hHrN6HY6VMjIHZezfXJMlZKg5-84jOPheQGlvPEBqRqNliQOHLaJ2cNgLSObrp1n1DDnAgQBH2A0LxyB7hvii8j1q5OuBVUftV8Yg", icon: "zoom_in" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb_vhVcOotG1mgoSC-XQNhfv-qGY1aIDWXe6xDeaeO1lCNN2az_t1_8Ha8kqiISnidbbaaRnRSfErddL7NdqqApBps4ulY54nA2_9WnMoOGp5Y7daNfPoJiJ1ZRdZTBidpK3lm4FKdAe2pn4MmuVnXV1ERU_U7Rp_-SJATkquqzmN8hzdIloyyxs2O2dbB5JwEmGPMow2uEE5t1MhcywGw5RJuvTCwNmvf83ECRJmHflyV-SxZVALl_Ua-IcjAOKyLxKscjjkKLVI", icon: "play_circle_outline" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo5KWWaA42kk6mM3-DF5GRuieE1YbadyC4aUv4z4iSM9jKhbKQj-6eZ2teu0nuJfaSBubiObI8tdieV1LEn47gOoEzotUQ3DF5dM6mdFzifngz5Zpml8HV8s2eTWhW6RZTxoT_-M2gsEQ-YQahQ8Y7bhXG0Xlg9kHDZnOmtJe3ifAKbCir4BHrwVcalR0Xlxj30MkfYMj9ZPh_qqwBRRV1jCgdm2rWfymTN40GsEozRD27QZI3p2M_-n_zDrl0eifmpdSgnKIJTG0", icon: "zoom_in" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuABuaH99HhGu1cuM4d4BQffaTzKqL4zO_9FrKf08zX0x93zfSF64KpY3sbkXNKLu7xe2pig-eRa5c5Kd1neNEUI_2vj9xrtLrSaDE3OAn1UWkIcUUjhjWZ622-EPDEQIn0z5fcN9WuLI9rZ3ygOg-snQcJiAXU4cZqqpP0dXRRiQLzFPngNPwg8aK0HGhOwHEUtKH6m1FoExtxJvdPgXeGQEB1SZjNeHGGbpcitnDDlU0s8ve3okqQTZYAVFjL4NRzZzCO9_Oi_kv4", icon: "zoom_in" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeO2WrokBPuGAoS6qThZPnTWYJ9wKqVqmtiOtb8y-q0jRXqDPKcnV-j6jvQ0dJpZDjh5Wy3MTUF_83zeWtvRK19cDRIMPKAX4zjfnZFP3AlkzjdQhHyLz5bdBL-h1b6ky53kiPAxMaBmEp3xZ4_M9z6nh46sR--kQdk1AErMSIyGT16jwWl1TTLyA7qucxkWlEXZw5WyMcfRAEo98pi0vMVq9tOAKzo9Hcbk2lmA-FhL_1WtuDnOum76kTPHuMlqIT9scjz6_FY9o", icon: "zoom_in" },
];

const GallerySection = () => (
  <section className="py-12">
    <h2 className="text-3xl font-bold mb-8 text-center text-white">Photo & Video Gallery</h2>
    <div
      className="overflow-x-auto horizontal-scroll pb-4 -mx-4 px-4"
      style={{
        scrollbarWidth: "none",      // For Firefox
        msOverflowStyle: "none",     // For IE and Edge
      }}
    >
      <style>
        {`
          .horizontal-scroll::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="flex space-x-4">
        {images.map((img, i) => (
          <div key={i} className="group relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80">
            <img src={img.src} alt={`Travel photo ${i+1}`} className="w-full h-full object-cover rounded-lg cursor-pointer" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-icons text-white text-4xl">{img.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
