import sneakerBrands from '../../api/sneakerBrands';
import sneakerCategories from '../../api/sneakerCategories';
import sneakerPopular from '../../api/sneakerPopular';
import sneakerYear from '../../api/sneakerYear';
import requireLogos from '../../assets/brandLogos/requireLogos';
import requireSneaker from '../../assets/sneakers/requireSneaker';

const btnsCategories = [
  {_id: sneakerCategories.BRANDS._id, title: 'Brand'},
  {_id: sneakerCategories.POPULAR._id, title: 'Popular'},
  {_id: sneakerCategories.YEAR._id, title: 'Year'},
];
const btnsBrands = [
  {_id: sneakerBrands.NIKE._id, imagePath: requireLogos.NIKE},
  {_id: sneakerBrands.JORDAN._id, imagePath: requireLogos.JORDAN},
  {_id: sneakerBrands.ADIDAS._id, imagePath: requireLogos.ADIDAS},
  {_id: sneakerBrands.YEEZY._id, imagePath: requireLogos.YEEZY},
  {_id: sneakerBrands.NEW_BALANCE._id, imagePath: requireLogos.NEW_BALANCE},
  {_id: sneakerBrands.ASICS._id, imagePath: requireLogos.ASICS},
  {_id: sneakerBrands.PUMA._id, imagePath: requireLogos.PUMA},
  {_id: sneakerBrands.CONVERSE._id, imagePath: requireLogos.CONVERSE},
  {_id: sneakerBrands.VANS._id, imagePath: requireLogos.VANS},
  {_id: sneakerBrands.REEBOK._id, imagePath: requireLogos.REEBOK},
  {_id: sneakerBrands.SAUCONY._id, imagePath: requireLogos.SAUCONY},
  {_id: sneakerBrands.UNDER_ARMOUR._id, imagePath: requireLogos.UNDER_ARMOUR},
];
const btnsPopular = [
  {_id: sneakerPopular.DUNK._id, imagePath: requireSneaker.DUNK, title: 'DUNK'},
  {
    _id: sneakerPopular.TRAVIS._id,
    imagePath: requireSneaker.TRAVIS,
    title: 'TRAVIS',
  },
  {
    _id: sneakerPopular.OFF_WHITE._id,
    imagePath: requireSneaker.OFF_WHITE,
    title: 'OFF-WHITE',
  },
  {
    _id: sneakerPopular.YEEZY._id,
    imagePath: requireSneaker.YEEZY,
    title: 'YEEZY',
  },
  {
    _id: sneakerPopular.SACAI._id,
    imagePath: requireSneaker.SACAI,
    title: 'SACAI',
  },
  {
    _id: sneakerPopular.JORDAN._id,
    imagePath: requireSneaker.JORDAN,
    title: 'JORDAN',
  },
];
const btnsYear = [
  {_id: sneakerYear.Y2010.year, title: '2010'},
  {_id: sneakerYear.Y2011.year, title: '2011'},
  {_id: sneakerYear.Y2012.year, title: '2012'},
  {_id: sneakerYear.Y2013.year, title: '2013'},
  {_id: sneakerYear.Y2014.year, title: '2014'},
  {_id: sneakerYear.Y2015.year, title: '2015'},
  {_id: sneakerYear.Y2016.year, title: '2016'},
  {_id: sneakerYear.Y2017.year, title: '2017'},
  {_id: sneakerYear.Y2018.year, title: '2018'},
  {_id: sneakerYear.Y2019.year, title: '2019'},
  {_id: sneakerYear.Y2020.year, title: '2020'},
  {_id: sneakerYear.Y2021.year, title: '2021'},
];

export default {
  btnsCategories,
  btnsBrands,
  btnsPopular,
  btnsYear,
};
