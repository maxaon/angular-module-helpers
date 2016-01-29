angular.module('<%= moduleName %>')
  .directive('<%= directiveName %>', function () {
    return {
      <%= directiveContent %>
    };
  });
