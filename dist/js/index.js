$(function() {
   $('nav ul li:last-of-type').click(function() {window.open('https://ahmedessam.info/')})

   $(window).resize(function() {
      if (window.innerWidth >= 768) {
         $('nav ul').css('display', 'block')
      } else {
         $('nav ul').css('display', 'none')
      }
   })

   $('.mobile').click(function() {
      $('nav ul').fadeToggle(250)
   })

   $('input[name="search"]').focus(function() {
      $(this).removeAttr('placeholder')

   }).blur(function() {$(this).attr('placeholder', "Enter ID or URL for channel")})

   $('.boxFullValid .close').click(function () {
      $('.boxFullValid').fadeOut(0)
   })

   $('.search p span:first-of-type').click(function () {
      $('.boxFullValid').fadeIn(0)
   })

   $('.search #random').click(function () {
      $('input[name="search"]').val('https://www.youtube.com/channel/UCf5eV04TeNt8k6hNKAsbgfw/')
   })

   $('body').on('click', '#history > div', function(){
      $('input[name="search"]').val($(this).find('.who span:last-of-type').text())
   });
})