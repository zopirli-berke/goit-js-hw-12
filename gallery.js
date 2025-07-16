import"./assets/styles-CeI2wy5p.js";import{a as b,S as L,i as w}from"./assets/vendor-DceEIEvX.js";const k="51131580-71d1bfd62f4d437a89cc3b2bc",z="https://pixabay.com/api/",v=40;async function d(e,r=1){try{const t=await b.get(z,{params:{key:k,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:v,page:r}});return{hits:t.data.hits,totalHits:t.data.totalHits}}catch(t){throw console.error("API isteği sırasında bir hata oluştu:",t.message),new Error("API isteği başarısız oldu.")}}const E=document.querySelector(".search-form"),o=document.querySelector(".gallery-list"),u=document.querySelector("#loader"),c=document.querySelector(".load-more-btn");let n=1,l="",s=0;const H=new L(".gallery a");i();E.addEventListener("submit",I);c.addEventListener("click",S);async function I(e){e.preventDefault();const r=e.target.elements.searchQuery.value.trim();if(!r){a("info","Arama alanı boş olamaz!");return}l=r,n=1,o.innerHTML="",i(),f();try{const{hits:t,totalHits:y}=await d(l,n);if(s=y,t.length===0){a("error","Üzgünüz, arama sorgunuza uygun görsel bulunamadı. Lütfen tekrar deneyin!");return}h(t),s>t.length&&p(),m()}catch(t){a("error","Bir hata oluştu. Lütfen daha sonra tekrar deneyin."),console.error(t)}finally{g()}}async function S(){n+=1,f(),i();try{const{hits:e}=await d(l,n);h(e,!1),M(),m()}catch(e){a("error","Görseller yüklenirken bir hata oluştu."),console.error(e)}finally{g()}}function h(e,r=!0){const t=e.map(A).join("");r?o.innerHTML=t:o.insertAdjacentHTML("beforeend",t),H.refresh()}function A(e){return`
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
  `}function m(){o.children.length>=s?(i(),s>0&&a("info","Üzgünüz, arama sonuçlarının sonuna ulaştınız.")):p()}function M(){const e=o.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}function f(){u.classList.remove("hidden")}function g(){u.classList.add("hidden")}function p(){c.classList.remove("hidden")}function i(){c.classList.add("hidden")}function a(e,r){w[e]({message:r,position:"topRight",timeout:3e3})}
//# sourceMappingURL=gallery.js.map
