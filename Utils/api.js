export default api = {
 getRepos(username) {
    username = username.toLowerCase().trim();
    // `` this is the es6 way to concatenate string and var
    const url = `https://api.github.com/users/${username}/repos`;
    return fetch(url).then(res => res.json())
 },
 getBio(username) {
    username = username.toLowerCase().trim();
    // `` this is the es6 way to concatenate string and var
    const url = `https://api.github.com/users/${username}`;
    return fetch(url).then(res => res.json())
 },

 getNotes(username) {
   username = username.toLowerCase().trim();
   const url = `https://react-native-64fc4.firebaseio.com/${username}.json`;
   return fetch(url).then(res=> res.json())
 },

 addNote(username, note) {
   username = username.toLowerCase().trim();
   const url = `https://react-native-64fc4.firebaseio.com/${username}.json`;
   return fetch(url, {
     method: 'post',
     body:JSON.stringify(note)
   }).then(res => res.json());
 }
}