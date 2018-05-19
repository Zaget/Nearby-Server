module.exports = (markup) => (`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Apateez Recommendations</title>
        <link rel="icon" href="https://s3-us-west-1.amazonaws.com/apateezassets/apateez-logo-small-red.jpeg" type="image/x-icon">
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div id="nearby-app">${markup}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
);