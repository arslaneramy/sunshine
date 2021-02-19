const Handlebars = require("hbs");
/*function editDeletePermision(user, host) {
    if (data.user === this.host[0])
        return true;
    else
        return false;
}*/

Handlebars.registerHelper("xif", function editDeletePermision(user, host) {
    if (user === host)
        return true;
    else
        return false;
});

/*Handlebars.registerHelper("xif", function (expression, options) {
    return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
  });*/

//   <script id="whatever" type ="text/x-handlebars-template">

//   </script>