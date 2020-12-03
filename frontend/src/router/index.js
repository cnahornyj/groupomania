import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Signup from '../views/Signup'
import HomePage from '../views/HomePage'
import MyProfile from '../views/MyProfile'
import Post from '../views/Post'
import Axios from 'axios'
import store from '../store/store'


Vue.use(VueRouter)


  
  

const routes = [
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Home',
    name: 'HomePage',
    component: HomePage, 
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: MyProfile,
  },
  {
    path: '/Post/:id',
    name: 'Post',
    component: Post
  },
]



const router = new VueRouter({
  routes
})


// Vérification de l'authentification avant l'accès aux routes (autre que login et signup)
router.beforeEach((to, from, next) => {
  // Si authenticated est true alors, on a accès aux pages
  if(store.state.authenticated === true){ 
    console.log("authenticated, true")
    next()
  } else { // Sinon, on vérifie qu'il y ait un token
    console.log("authenticated, false")
    const token = sessionStorage.getItem('usertoken');

    // Si le token n'est pas présent mais que l'utilisateur souhaite accéder aux pages login et signup
    if(to.name == 'Login' || to.name == 'Signup'){
      // On le laisse passer
      console.log("Go to Login or Signup page")
      next();

    // Si le token est présent, et que l'on veut aller sur une page autre que Login et Signup
    } else if((token!== null) && (to.name !== 'Login' || to.name !== 'Signup')){  
    console.log("Ok")

    // On vérifie que le token soit correct
    Axios.get('http://localhost:3000/api/auth', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log("La réponse du serveur" , response.data.message);
      if(response.data.message === "Ok"){
        store.commit("setAuthentication", true);
        next();
      } else {
        next('Login');
      }
      
    })
    .catch(error => {
      console.log(error); 
      next('Login');
    });
    
      // Si toutes les conditions ne sont pas remplies, alors on redirige la personne vers la page Login
    } else {
      next('Login')
    }
  }
  
  }
)

export default router
