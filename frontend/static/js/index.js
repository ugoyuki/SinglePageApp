import Dashboard from "./views/Dashboard";
import Posts from "./views/Posts";
import Settings from "./views/Settings";

const navigateTo = url => {
    history.pushState(null,null,null)
    router();
}

const router = async () => {
    const routes = [
        {path:"/",view: Dashboard},
        {path:"/posts",view: Posts},
        {path:"/settings",view:Settings},
    ];

    const potentialMatches = routes.map(route => {
        return {
            route:route,
            isMatch:localtion.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatches =>potentialMatches.isMatch);

    if(!match){
        match = {
            route:routes[0],
            isMatch:true
        };
    };

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();

    console.log(potentialMatches);
};

window.addEventListener("popstate",router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e =>{
        if(e.targer.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
});