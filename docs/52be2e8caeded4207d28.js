var productData = {
  mockups: {
    standart: {
      price: '$12',
      description: "Hey there! We've created this Enhanced Standard License to make life easier for individuals and small businesses. Here's what you can do with it:<ul><li>Number of users: Perfect for individuals or companies with up to 20 users.</li><li>Personal use: (no money-making involved): Go wild! It's unlimited.</li><li>Business use: We've got you covered! Sell up to 750 End Products. Create up to 7,500 physical ads. Get up to 750,000 views on your digital ads</li></ul>Want to know all the nitty-gritty details? Check out our full license terms [here]. Got questions? Need more info? Don't be shy \u2013 just reach out to us! We're here to help."
    },
    extended: {
      price: '$120',
      description: "Looking for more freedom and flexibility? The Extended Commercial License is made for professionals who want to reach further. Unlock the full potential of your creative projects:<ul><li>Number of users: Unlimited \u2013 perfect for individuals, teams, and agencies of any size.</li><li>Personal use: Unlimited, no restrictions. Use it as much as you want, whenever you want.</li><li>Business use: Go big! Sell unlimited End Products. Print up to 25,000 physical ads. Get up to 2.5 million views on your digital ads.</li></ul>Want all the details? Check out our full license terms [here]. Have questions or a special project in mind? Just ask \u2014 we\u2019re always happy to help and support your creative journey!"
    }
  },
  textures: {
    standart: {
      price: '$9',
      description: "This Standard License is perfect for personal and small business use of our textures.<ul><li>Number of users: Up to 10 users.</li><li>Personal use: Unlimited projects, non-commercial only.</li><li>Business use: Up to 300 End Products, 3,000 physical ads, and 300,000 digital ad impressions.</li></ul>For full license details, see our terms [here]. Questions? Contact us anytime!"
    },
    extended: {
      price: '$90',
      description: "The Extended License gives you maximum flexibility for commercial projects using our textures.<ul><li>Number of users: Unlimited.</li><li>Personal use: Unlimited, no restrictions.</li><li>Business use: Unlimited End Products, up to 10,000 physical ads, and 1,000,000 digital ad impressions.</li></ul>See the full license terms [here]. Need help or have a special request? Reach out \u2014 we\u2019re here for you!"
    }
  },
  templates: {
    standart: {
      price: '$15',
      description: "The Standard License for Templates is ideal for freelancers, students, and small teams.<ul><li>Number of users: Up to 5 users.</li><li>Personal use: Unlimited non-commercial presentations and projects.</li><li>Business use: Up to 100 End Products, 1,000 printed copies, and 100,000 digital views.</li></ul>Read the full license terms [here]. Have questions? We're happy to help!"
    },
    extended: {
      price: '$150',
      description: "The Extended License for Templates is designed for agencies and businesses needing maximum creative freedom.<ul><li>Number of users: Unlimited.</li><li>Personal use: Unlimited, no restrictions.</li><li>Business use: Unlimited End Products, up to 20,000 printed copies, and 2,000,000 digital views.</li></ul>See all license details [here]. Need a custom solution? Contact us anytime!"
    }
  },
  collections: {
    standart: {
      price: '$25',
      description: "The Standard License for Collections is perfect for individuals and small teams who want a mix of mockups, textures, templates, and more.<ul><li>Number of users: Up to 10 users.</li><li>Personal use: Unlimited use across all included assets for non-commercial projects.</li><li>Business use: Up to 200 End Products, 2,000 printed ads, and 200,000 digital ad impressions using any asset from the collection.</li></ul>See the full license terms [here]. Questions? We're here to help!"
    },
    extended: {
      price: '$250',
      description: "The Extended License for Collections is designed for professionals and agencies who need maximum flexibility with a variety of assets.<ul><li>Number of users: Unlimited.</li><li>Personal use: Unlimited, no restrictions, for all included assets.</li><li>Business use: Unlimited End Products, up to 50,000 printed ads, and 5,000,000 digital ad impressions using any asset from the collection.</li></ul>Full license terms are available [here]. Need a custom solution or have questions? Contact us anytime!"
    }
  }
};
var productType = document.body.getAttribute('data-product-type');

function updateProductInfo(type) {
  var priceElem = document.querySelector('.product-description .heading-m');
  var descElem = document.querySelector('.product-description .heading-xs');

  if (priceElem && descElem) {
    priceElem.textContent = productData[productType][type].price;
    descElem.innerHTML = productData[productType][type].description;
  }
}

function setActiveTag(tagElem) {
  document.querySelectorAll('.product-tag').forEach(function (tag) {
    tag.removeAttribute('data-active');
    tag.style.backgroundColor = '';
  });
  tagElem.setAttribute('data-active', 'true');
  tagElem.style.backgroundColor = '#C8FF03';
}

window.addEventListener('DOMContentLoaded', function () {
  var tags = document.querySelectorAll('.product-tag');
  tags.forEach(function (tag) {
    if (tag.textContent.trim().toLowerCase() === 'standart') {
      setActiveTag(tag);
      updateProductInfo('standart');
    }

    tag.addEventListener('click', function () {
      var type = tag.textContent.trim().toLowerCase();
      setActiveTag(tag);
      updateProductInfo(type);
    });
    tag.addEventListener('mouseenter', function () {
      tag.style.backgroundColor = '#C8FF03';
    });
    tag.addEventListener('mouseleave', function () {
      if (tag.getAttribute('data-active') === 'true') {
        tag.style.backgroundColor = '#C8FF03';
      } else {
        tag.style.backgroundColor = '';
      }
    });
  });
});

if (document.body.getAttribute('data-product-type') === 'collections') {
  document.addEventListener('DOMContentLoaded', function () {
    var images = document.querySelectorAll('.product-images .product-image');
    var thumbs = document.querySelectorAll('.product-thumbnails .thumbnail');
    thumbs.forEach(function (thumb, idx) {
      thumb.addEventListener('click', function () {
        images.forEach(function (img) {
          return img.classList.remove('active');
        });
        thumbs.forEach(function (t) {
          return t.classList.remove('active');
        });
        images[idx].classList.add('active');
        thumb.classList.add('active');
      });
    });
  });
}