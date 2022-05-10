window.onload = () => {
  loadAllCarousels();
};

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

  if ($('.popularVids .pop-vids-4 .carousel-inner').length) {
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/popular-tutorials',
      type: 'GET',
      dataType: 'json',
      beforeSend: function () {
        $('.loader').show();
      },
      success: (data) => {
        const cardList = [];
        data.forEach((card) => {
          cardList.push(createCard(card));
        });
        setCarouselItems(
          cardList,
          4,
          $('.popularVids .pop-vids-4 .carousel-inner')
        );
        setCarouselItems(
          cardList,
          2,
          $('.popularVids .pop-vids-2 .carousel-inner')
        );
        setCarouselItems(
          cardList,
          1,
          $('.popularVids .pop-vids-1 .carousel-inner')
        );
      },
      complete: function () {
        $('.loader').hide();
      },
    });
  }
  if ($('.latestVids .pop-vids-4 .carousel-inner').length) {
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/latest-videos',
      type: 'GET',
      dataType: 'json',
      beforeSend: function () {
        $('.loader').show();
      },
      success: (data) => {
        const cardList = [];
        data.forEach((card) => {
          cardList.push(createCard(card));
        });
        setCarouselItems(
          cardList,
          4,
          $('.latestVids .pop-vids-4 .carousel-inner')
        );
        setCarouselItems(
          cardList,
          2,
          $('.latestVids .pop-vids-2 .carousel-inner')
        );
        setCarouselItems(
          cardList,
          1,
          $('.latestVids .pop-vids-1 .carousel-inner')
        );
      },
      complete: function () {
        $('.loader').hide();
      },
    });
  }

  if ($('.results .row').length) {
    getCourses($('.results .row'));
    $('form-container').submit((e) => {
      e.preventDefault();
      getCourses($('.results .row'));
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

const createCard = (info) => {
  const card = $('<div class="card border-0 text-dark"></div>')[0];
  let cardContent = `<div class="card-header">
	<img src="${info.thumb_url}" width="255" height="154">
	<img class="play-btn" src="images/play.png" width="64" height="64">
  </div>
  <div class="card-body pl-3 py-2">
	<h5 class="card-title mt-2"><b>${info.title}</b></h5>
	<small class="card-text">${info['sub-title']}</small>
	<div class="d-flex flex-row align-items-center mt-3">
	  <img class="rounded-circle" src="${info.author_pic_url}" width="30" height="30">
	  <small class="text-purple ml-2"><b>${info.author}</b></small>
	</div>
	<div class="d-flex flex-row align-items-center justify-content-between mt-2">
	  <div class="d-flex justify-content-between align-items-center w-50">`;
  for (var i = 0; i < info.star; ++i) {
    cardContent += `<img src="images/star_on.png" width="15" height="15">`;
  }
  while (i++ < 5) {
    cardContent += `<img src="images/star_off.png" width="15" height="15">`;
  }
  cardContent += `</div>
	  <small class="text-purple"><b>${info.duration}</b></small>
	</div>
  </div>`;
  $(card).append(cardContent);
  return card;
};

const setCarouselItems = (list, items, carousel) => {
  for (let i = 0; i < list.length; i++) {
    const carouselItem = $('<div class="carousel-item">')[0];

    if ($(list[0]).hasClass('card')) {
      var flexSetup = $(
        '<div class="d-flex flex-row justify-content-around"></div>'
      )[0];
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

const getCourses = (target) => {
  // clear out existing entries and show loader
  $('.results .loader').show();
  // console.log('target', target);
  $(target).empty();
  // grab all search parameters for api
  let keywords = $('#searchInput').val();
  let topic = $('#topicSelect').val();
  let sortBy = $('#exampleFormControlSelect1').val();
  // console.log('key:', keywords, 'top:', topic, 'sort:', sortBy);
  // set base api url
  let apiUrl = 'https://smileschool-api.hbtn.info/courses?';
  // fill with search parameters if present
  if (keywords) {
    apiUrl += `&q=${keywords}`;
  }
  if (topic) {
    apiUrl += `&topic=${topic}`;
  }
  if (sortBy) {
    apiUrl += `&sort=${sortBy}`;
  }
  // console.log(apiUrl);
  $.get(apiUrl, (data) => {
    // console.log('coursesData', data);
    const cardList = [];
    for (let item of data.courses) {
      cardList.push(createCard(item));
    }
    // console.log('coursesList', cardList);
    let topics = $('.form-control#topicSelect')[0];
    let sorts = $('.form-control#exampleFormControlSelect1')[0];
    // check if the options are already there, if not fill them up!
    if (!topics.childElementCount) {
      // console.log('firing topics');
      for (let option of data.topics) {
        $(topics).append(createOption(option));
      }
    }
    if (!sorts.childElementCount) {
      // console.log('firing sorts');
      for (let option of data.sorts) {
        $(sorts).append(createOption(option));
      }
    }
    // add event listeners
    if (!$(topics).hasClass('listener')) {
      $(topics).addClass('listener');
      $(topics).on('change', () => $(topics).closest('form').submit());
    }
    if (!$(sorts).hasClass('listener')) {
      $(sorts).addClass('listener');
      $(sorts).on('change', () => $(sorts).closest('form').submit());
    }
    fillCourses(cardList, target);
  }).done(() => {
    $('.results .loader').hide();
  });
};

function createOption(info) {
  return $(
    `<option class="bg-white text-body" value="${info}">${capFirstLtr(
      info
    )}</option>`
  )[0];
}

function capFirstLtr(string) {
  let words = string.split('_');
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
}

function fillCourses(cardList, target) {
  // console.log('cardList', cardList);
  // console.log('target', target);
  for (card of cardList) {
    var wrapper = $(
      '<div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center my-2">'
    )[0];
    wrapper.append(card);
    target.append(wrapper.cloneNode(true));
  }
}
