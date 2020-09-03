function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();            //サーバーにHTTPリクエストを非同期で行う
      XHR.open("GET", `/posts/${postId}`, true); 　//コントローラーのどのアクションを指定するか
      XHR.responseType = "json";                   //レスポンスの形式を指定している
      XHR.send();    
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };                             
    });
  });
}
setInterval(check, 1000);