import"./assets/styles-CeI2wy5p.js";import{a as b,S as L,i as w}from"./assets/vendor-DceEIEvX.js";const k="51131580-71d1bfd62f4d437a89cc3b2bc",z="https://pixabay.com/api/",v=40;async function u(e,o=1){try{const t=await b.get(z,{params:{key:k,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:v,page:o}});return{hits:t.data.hits,totalHits:t.data.totalHits}}catch(t){throw console.error("API isteği sırasında bir hata oluştu:",t.message),new Error("API isteği başarısız oldu.")}}const E=document.querySelector(".search-form"),n=document.querySelector(".gallery-list"),i=document.querySelector("#loader"),d=document.querySelector(".load-more-btn");let r=1,l="",s=0;const H=new L(".gallery a");c();function I(){i.classList.remove("hidden")}function S(){i.classList.add("hidden")}E.addEventListener("submit",A);d.addEventListener("click",M);async function A(e){e.preventDefault();const o=e.target.elements.searchQuery.value.trim();if(!o){a("info","Arama alanı boş olamaz!");return}l=o,r=1,n.innerHTML="",c(),m();try{const{hits:t,totalHits:y}=await u(l,r);if(s=y,t.length===0){a("error","Üzgünüz, arama sorgunuza uygun görsel bulunamadı. Lütfen tekrar deneyin!");return}h(t),s>t.length&&p(),f()}catch(t){a("error","Bir hata oluştu. Lütfen daha sonra tekrar deneyin."),console.error(t)}finally{g()}}async function M(){r+=1,m(),I(),c();try{const{hits:e}=await u(l,r);h(e,!1),x(),f()}catch(e){a("error","Görseller yüklenirken bir hata oluştu."),console.error(e)}finally{g(),S()}}function h(e,o=!0){const t=e.map(T).join("");o?n.innerHTML=t:n.insertAdjacentHTML("beforeend",t),H.refresh()}function T(e){return`
    <li class="image-card">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        <div class="info">
          <p><b>Likes</b> ${e.likes}</p>
          <p><b>Views</b> ${e.views}</p>
          <p><b>Comments</b> ${e.comments}</p>
          <p><b>Downloads</b> ${e.downloads}</p>
        </div>
      </a>
    </li>
  `}function f(){n.children.length>=s?(c(),s>0&&a("info","Üzgünüz, arama sonuçlarının sonuna ulaştınız.")):p()}function x(){const e=n.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}function m(){i.classList.remove("hidden")}function g(){i.classList.add("hidden")}function p(){d.classList.remove("hidden")}function c(){d.classList.add("hidden")}function a(e,o){w[e]({message:o,position:"topRight",timeout:3e3})}
//# sourceMappingURL=gallery.js.map
