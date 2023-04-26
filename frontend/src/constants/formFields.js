const loginFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username (you can use 'user1' directly)"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password (you can use '123' directly)"   
    }
]

const signupFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"test_account",
        isRequired:true,
        placeholder:"Username (You can use 'test_account')",
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"test@gmail.com",
        isRequired:true,
        placeholder:"Email address ('You can use 'test@gmail.com')"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"123",
        isRequired:true,
        placeholder:"Password (You can use '123')"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"123",
        isRequired:true,
        placeholder:"Confirm Password (Re-enter '123')"   
    },
    {
        labelText:"Name",
        labelFor:"name",
        id:"name",
        name:"name",
        type:"text",
        autoComplete:"Lucy",
        isRequired:false,
        placeholder:"Name (You can use 'Lucy')"   
    },
    {
        labelText:"Avatar",
        labelFor:"avatar",
        id:"img",
        name:"avatar",
        type:"text",
        autoComplete:"https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png",
        isRequired: true,
        placeholder:"Avatar (You can use 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png')"   
    }
]

export {loginFields,signupFields}