

const Emailvalidation =  (e) =>{
 
        var data = e.username;

        var emailObject = {
            'password': e.password,
            'email':data ,
            'query':'email'
        }
        var userObject = {
            'password': e.password,
            'username':data ,
            'query':'username'
        }

        if (/^\S+@\S+\.\S+$/.test(data)) {
            console.log('Input is an email:', emailObject, e);
            return emailObject

          } else {
          
            console.log('Input is a username:', userObject ,e);
            return userObject

          }        

}

export default Emailvalidation
