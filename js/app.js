var request = superagent;
const URL_USER = 'https://api.github.com/users/';
const TOKEN = '?access_token=2e5387afa2891ca68af8c894893d13538c6c696d';
const URL_REPOS = '/repos'+TOKEN;

var user = document.querySelector('.user-name');
var nickname = document.querySelector('.user-nickName');
var imageAvatar = document.querySelector('.avatar');
var company = document.querySelector('.company');
var city = document.querySelector('.location');
var email = document.querySelector('.email');
var blog = document.querySelector('.blog');
var description = document.querySelector('.repositories-description');
var input = document.querySelector('.search');

default_user = 'matthiasak';
var initial_usuer = URL_USER+default_user+TOKEN;
var default_repo = URL_USER+default_user+URL_REPOS;

function getDefaultUser() {
  return request.get(initial_usuer);
}
function printDefaultUser(response){
  default_user = response.body;
  console.log(default_user.name);
  user.textContent = default_user.name;
  imageAvatar.src = default_user.avatar_url;
  nickname.textContent = default_user.login;
  company.textContent = default_user.company;
  city.textContent = default_user.location;
  email.textContent = default_user.email;
  blog.textContent = default_user.blog;
}
function getDefaultRepo() {
  return request.get(default_repo);
}
function printDefaultRepo(response){
  info_repo = response.body;
  var html =""
    info_repo.forEach(function(repo){
      html += '<div class="info-repo">';
              html += '<p class="repository-name">'+repo.name+'</p>';
              html += '<p class="repository-description">'+repo.description+'</p>';
              html += '<p class="repository-details">'+repo.language+' | '+repo.stargazers_count+ ' | '+repo.updated_at+'</p>';
            html += '	</div>';
    })
    description.innerHTML = html
}
getDefaultUser()
  .then(printDefaultUser);

getDefaultRepo().
  then(printDefaultRepo);

input.addEventListener("keypress", function(event){
var user_input = "";
  if(event.keyCode == 13){
    user_input = input.value;
    var url = URL_USER+user_input+TOKEN;
    var repositories = URL_USER+user_input+URL_REPOS;
    console.log(url)
    console.log(repositories);
    request.get(url).then(function(response){
    			console.log(response.body);
          console.log(response.body.name);
    			user.textContent = response.body.name;
    			imageAvatar.src = response.body.avatar_url
    			nickname.textContent = response.body.login
    			company.textContent = response.body.company
    			city.textContent = response.body.location
    			email.textContent = response.body.email
    			blog.textContent = response.body.blog
    })
    request.get(repositories).then(function(response){
  		info_repo = response.body;
  		var html =""
  			info_repo.forEach(function(repo){
  				html += '<div class="info-repo">';
  								html += '<p class="repository-name">'+repo.name+'</p>';
  								html += '<p class="repository-description">'+repo.description+'</p>';
  								html += '<p class="repository-details">'+repo.language+' | '+repo.stargazers_count+ ' | '+repo.updated_at+'</p>';
  							html += '	</div>';
  			})
  			description.innerHTML = html
  	})
  }
})
