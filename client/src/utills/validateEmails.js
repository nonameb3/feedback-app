const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default function(emails) {
  const invalidEmail = emails
    .split(',')
    .map(email=>email.trim())
    .filter(email=>emailRegex.test(email)===false)
  
    if(invalidEmail.length) {
      return `These emails are invalid: ${invalidEmail}`
    }

    return
}
