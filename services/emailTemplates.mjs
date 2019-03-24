import { REDIRECT } from '../services_config'

export default function(val) {
  return `
    <html>
      <body>
        <div style="text-align: center">
          <h3>I'd like your input!</h3>
          <p>${val.body}</p>
          <div>
            <a href="${REDIRECT}/api/surveys/thx">Yes</a>
          </div>
          <div>
            <a href="${REDIRECT}/api/surveys/thx">No</a>
          </div>
        </div>
      </body>
    </html>
  `
}
