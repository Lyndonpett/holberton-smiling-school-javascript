window.onload = () => {
  loadAllCarousels();
};

// const loadAllCarousels = () => {
//   if ($('.quotes .carousel-inner').length) {
//     $.get('https://smileschool-api.hbtn.info/quotes', (data) => {
//       const commentList = [];
//       data.forEach((comment) => {
//         commentList.push(createComment(comment));
//       });
//       setCarouselItems(commentList, 1, $('.quotes .carousel-inner'));
//     });
//   }
// };

const loadAllCarousels = () => {
  if ($('.quotes .carousel-inner').length) {
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/quotes',
      type: 'GET',
      dataType: 'json',
      beforeSend: function () {
        $('.loader').show();
      },
      success: (data) => {
        const commentList = [];
        data.forEach((comment) => {
          commentList.push(createComment(comment));
        });
        setCarouselItems(commentList, 1, $('.quotes .carousel-inner'));
      },
      complete: function () {
        $('.loader').hide();
      },
    });
  }
};

const createComment = (comment) => {
  const cmnt = $(
    '<div class="d-flex flex-column align-items-center flex-sm-row col-sm-10 carousel-helper">'
  )[0];

  let cmntContent = `<img class="rounded-circle carousel-avatar" src="${comment.pic_url}" width="175" />
					<div class="px-sm-5">
					<p class="pl-2 pr-4 mt-4 mt-md-0">${comment.text}</p>
					<p class="font-weight-bold pl-2 pt-2 mb-1 align-self-start">${comment.name}</p>
					<cite class="pl-2 align-self-start">${comment.title}</cite>
					</div>`;
  $(cmnt).append(cmntContent);
  return cmnt;
};

const setCarouselItems = (list, items, carousel) => {
  for (let i = 0; i < list.length; i++) {
    const carouselItem = $('<div class="carousel-item">')[0];

    if ($(list[0]).hasClass('card')) {
    } else {
      var flexSetup = document.createDocumentFragment();
    }
    if (!i) {
      $(carouselItem).addClass('active');
    }
    for (let j = i; j < i + items; j++) {
      flexSetup.append(list[j % list.length]);
    }
    carouselItem.append(flexSetup.cloneNode(true));
    carousel.append(carouselItem.cloneNode(true));
  }
};
