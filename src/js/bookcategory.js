document.addEventListener('DOMContentLoaded', function() {
  function yourFunctionName() {
    // Your function's code here 
    const collapseNav = document.querySelector('#nav-collpsed');

    collapseNav.classList.remove('collapse');
    collapseNav.classList.remove('navbar-collapse');
    console.log(collapseNav);
  }

  function expandNavbarOnBreakpoint() {
    const navbarCollapse = document.getElementById('nav-collpsed');
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    function handleMediaQueryChange(e) {
      if (e.matches) {
        yourFunctionName()
      } else {
        navbarCollapse.classList.remove('show');
      }
    }
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addListener(handleMediaQueryChange);
  }
  expandNavbarOnBreakpoint();
})

const selectElement = (element, selector, all = false) => {
  return all ? element.querySelectorAll(selector) : element.querySelector(selector);
}

const checkForClass = (element, classSelector) => {
  return element.classList.contains(classSelector);
}

const addClass = (element, nameClass) => element.classList.add(nameClass);

const removeClass = (element, nameClass) => element.classList.remove(nameClass);



const tebleListOrderBtn = selectElement(document, 'table th', true);

tebleListOrderBtn.forEach((v, index) => {

  v.addEventListener('click', function(e) {

    const element = tebleListOrderBtn[index];
    const orderIndicator = [...selectElement(element, '.order .bi', true)]

    if (!checkForClass(orderIndicator[0], 'active')) {
      addClass(orderIndicator[0], 'active');
      if (checkForClass(orderIndicator[1], 'active')) {
        removeClass(orderIndicator[1], 'active')
      }
    } else {
      addClass(orderIndicator[1], 'active');
      if (checkForClass(orderIndicator[0], 'active')) {
        removeClass(orderIndicator[0], 'active')
      }
    }

  })
})