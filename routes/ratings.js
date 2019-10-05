var express = require('express');
var router = express.Router();

router.use('/', function (req, res, next) {
    // let origin ='https://mail.google.com'
    // let sourceOrigin ='kuldeep.kumar.web@gmail.com';

    // let origin ='https://amp.gmail.dev'
    // let sourceOrigin ='amp@gmail.dev'; 

    let origin = req.headers['origin']
    let sourceOrigin = req.query['__amp_source_origin'];

    //https://amp.dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests/?format=websites
    if (req.headers['amp-same-origin'] === 'true') {
        origin = req.query.__amp_source_origin;
        sourceOrigin = origin;
    }

    // you can also validate that request came from Gmail using proxy assertion token
    // const proxyAssertionToken = req.get('Amp4Email-Proxy-Assertion');
    res.set({
        'Access-Control-Allow-Origin': origin,
        'AMP-Access-Control-Allow-Source-Origin': sourceOrigin,
        'Access-Control-Allow-Source-Origin':
            'AMP-Access-Control-Allow-Source-Origin',
        'Access-Control-Expose-Headers':
            'Access-Control-Allow-Origin' +
            ', AMP-Access-Control-Allow-Source-Origin' +
            ', Access-Control-Allow-Source-Origin'
    });
    next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    const token = req.query.token;
    console.log(req.query)
    res.json({
        "complex": {
            "inner": [
                { "x": "hulk" }
            ]
        },
        "items": [
            {
                "title": "rating1",
                "url": "/components/amp-carousel/"
            },
            {
                "title": "rating2",
                "url": "/components/amp-img/"
            },
            {
                "title": "rating3",
                "url": "/components/amp-ad/"
            },
            {
                "title": "rating4",
                "url": "/components/amp-accordion/"
            }
        ],
        "data": [{
            "name": "kuldeep"
        }
        ],
        "myobject": {
            "customprop": "horse"
        }
    })
});

/**
 *     }
  </script>
</amp-state>
  <div>
    <amp-layout layout="responsive" width="1" height="1">
      <h1>
Testing      </h1>
      <section [hidden]="currentPage > 0">
        <amp-list single-item items="myobject" layout="fixed-height" height="100" src="https://warm-spire-64611.herokuapp.com/ratings
" binding="no">
          <template type="amp-mustache">
            <div><a href="{{name}}">{{customprop}}</a></div>
          </template>
        </amp-list>
      </section>


     
 */
router.post('/', function (req, res) {
    const feedback = req.body;

    console.log(feedback)
    res.json({
        success: true,
        message: 'Thank you for your feedback.',
        feedback
    });
});

module.exports = router;
