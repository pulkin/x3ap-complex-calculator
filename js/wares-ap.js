var warez		= [];

function Ware(id,name,min,avg,max,vol,size,buy,sell,endprod,grp){

	warez.push(id)
	var ware	= [];

	ware.name	= name;
	ware.min	= min;
	ware.avg	= avg;
	ware.max	= max;
	ware.vol	= vol;
	ware.size	= size;
	ware.buy	= buy;
	ware.sell	= sell;
	ware.endprod  = endprod;
	warez[id] = ware;
}

Ware('s1gj','1 GJ Shield',275235,299168,323101,77,'XL',275235,299168,true,'Shield');
Ware('s1mj','1 MJ Shield',4154,5192,6230,1,'S',4154,5192,true,'Shield');
Ware('s2','2 GJ Shield',703049,747924,792799,222,'XL',703049,747924,true,'Shield');
Ware('s200','200 MJ Shield',140235,155816,171397,25,'L',140235,155816,true,'Shield');
Ware('s25','25 MJ Shield',74559,85700,96841,10,'S',74559,85700,true,'Shield');
Ware('s5','5 MJ Shield',17245,20776,24307,3,'S',17245,20776,true,'Shield');
Ware('as','Advanced Satellite',11051,13476,15901,4,'M',11051,13476,true,'Misc.');
Ware('ab','Argnu beef',42,104,166,4,'S',97,111,false,'Bio');
Ware('am','Aurora Missile',1616,2020,2424,3,'S',1616,2020,true,'Missile');
Ware('bnm','Banshee Missile',11994,13476,14958,1,'S',11994,13476,true,'Missile');
Ware('blm','Beluga Missile',24257,26952,29647,1,'M',24257,26952,true,'Missile');
Ware('bp','Boarding Pod',75197,80856,86515,3,'S',75197,80856,true,'Missile');
Ware('bf','BoFu',190,292,394,5,'M',269,315,false,'Food');
Ware('bg','BoGas',266,380,494,6,'S',354,406,false,'Bio');
Ware('crat','C-Ration',34,72,110,4,'M',67,77,false,'Food');
Ware('carb','Carbo Cake',10,32,54,2,'S',29,35,false,'Bio');
Ware('chm','Chelts Meat',50,104,158,2,'S',97,111,false,'Bio');
Ware('clr','Cloth Rimes',152,292,432,2,'S',269,315,false,'Food');
Ware('cfa','Cluster Flak Array',587744,638852,689960,33,'L',587744,638852,true,'Weapon');
Ware('cc','Computer Components',998,1348,1698,1,'S',1254,1442,false,'Tech');
Ware('cig','Concussion Impulse Generator',408365,448752,489139,25,'S',408365,448752,true,'Weapon');
Ware('xtl','Crystals',1432,1684,1936,4,'M',1567,1801,false,'Tech');
Ware('cym','Cyclone Missile',18195,20216,22237,3,'S',18195,20216,true,'Missile');
Ware('dw','Delexian Wheat',10,32,54,2,'S',29,35,false,'Bio');
Ware('dr','Disintegrator Rifles',19945,26952,33959,8,'S',19945,26952,true,'Tech');
Ware('dsm','Disruptor Missile',2762,3368,3974,1,'S',2762,3368,true,'Missile');
Ware('dfm','Dragonfly Missile',780,1012,1244,1,'S',780,1012,true,'Missile');
Ware('empc','Electro-Magnetic Plasma Cannon',306413,322540,338667,5,'S',306413,322540,true,'Weapon');
Ware('ebc','Energy Bolt Chaingun',129984,151144,172304,1,'S',129984,151144,true,'Weapon');
Ware('ebca','Energy Bolt Chaingun Ammunition',1079,1348,1617,1,'S',1079,1348,true,'Ammo');
Ware('ec','Energy Cells',12,16,20,1,'S',15,17,false,'Energy');
Ware('eempc','Experimental Electro-Magnetic Plasma Cannon',320475,323712,326949,5,'S',320475,323712,true,'Weapon');
Ware('fd','Fighter Drone',3195,4044,4893,2,'M',3195,4044,true,'Misc.');
Ware('fd2','Fighter Drone MKII',21293,26952,32611,4,'M',21293,26952,true,'Misc.');
Ware('ffm','Firefly Missile',171,224,277,1,'S',171,224,true,'Missile');
Ware('fim','Firelance Missile',2211,2696,3181,1,'S',2211,2696,true,'Missile');
Ware('ft','Firestorm Torpedo',75197,80856,86515,3,'S',75197,80856,true,'Missile');
Ware('fm','Flail Barrage Missile',26954,33692,40430,5,'M',26954,33692,true,'Missile');
Ware('faa','Flak Artillery Array',579640,623268,666896,30,'L',579640,623268,true,'Weapon');
Ware('flav','Flavour Pack',42,104,166,4,'S',97,111,false,'Bio');
Ware('fbl','Fragmentation Bomb Launcher',180282,202564,224846,5,'S',180282,202564,true,'Weapon');
Ware('frd','Freight Drone',26952,26952,26952,3,'M',26952,26952,true,'Misc.');
Ware('gc','Gauss Cannon',676732,727668,778604,55,'XL',676732,727668,true,'Weapon');
Ware('gca','Gauss Cannon Ammunition',5392,6740,8088,25,'L',5392,6740,true,'Ammo');
Ware('gm','Ghoul Missile',26954,33692,40430,3,'M',26954,33692,true,'Missile');
Ware('ht','Hammer Heavy Torpedo',46999,50536,54073,20,'L',46999,50536,true,'Missile');
Ware('hept','High Energy Plasma Thrower',124811,140236,155661,6,'S',124811,140236,true,'Weapon');
Ware('hom','Hornet Missile',8896,10108,11320,3,'M',8896,10108,true,'Missile');
Ware('hull','Hull Plating',180,224,268,10,'L',180,224,true,'Tech');
Ware('hum','Hurricane Missile',3357,4044,4731,2,'S',3357,4044,true,'Missile');
Ware('ibl','Incendiary Bomb Launcher',782514,841412,900310,110,'XL',782514,841412,true,'Weapon');
Ware('ice','Ice',50,128,206,8,'XL',111,145,false,'Mineral');
Ware('ire','Impulse Ray Emitter',3928,4676,5424,1,'S',3928,4676,true,'Weapon');
Ware('ic','Ion Cannon',925167,973860,1022553,150,'XL',925167,973860,true,'Weapon');
Ware('id','Ion Disruptor',241206,280472,319738,10,'M',241206,280472,true,'Weapon');
Ware('iom','Ion Mine',14758,20216,25674,6,'L',14758,20216,true,'Misc.');
Ware('ipg','Ion Pulse Generator',444390,483032,521674,28,'M',444390,483032,true,'Weapon');
Ware('isr','Ion Shard Railgun',405529,445636,485743,22,'M',405529,445636,true,'Weapon');
Ware('krs','Keris',6872,8084,9296,3,'M',0,8084,false,'Misc.');
Ware('lt','Lasertower',125835,151608,177381,100,'XL',125835,151608,true,'Misc.');
Ware('sa','Low-Yield Sidearms',9973,13476,16989,7,'S',9973,13476,true,'Tech');
Ware('mjs','Maja Snails',91,156,221,2,'S',147,165,false,'Bio');
Ware('mjl','Majaglit',9,36,63,2,'S',34,38,false,'Food');
Ware('Mar','Marine',15286,15440,15594,9,'M',0,15440,false,'Misc.');
Ware('md','Mass Driver',102841,116864,130887,1,'S',102841,116864,true,'Weapon');
Ware('mda','Mass Driver Ammunition',538,672,806,1,'S',538,672,true,'Ammo');
Ware('mp','Massom powder',17,36,55,1,'S',34,38,false,'Food');
Ware('maml','Matter/Anti-Matter Launcher',433798,451872,469946,21,'M',433798,451872,true,'Weapon');
Ware('mamm','Matter/Anti-Matter Mine',14758,20216,25674,5,'L',14758,20216,true,'Misc.');
Ware('mamw','Matter/Anti-matter Warhead',720,900,1080,4,'S',720,900,true,'Ammo');
Ware('msc','Meatsteak Cahoonas',34,72,110,4,'M',67,77,false,'Food');
Ware('merc','Mercenary',13896,14036,14176,8,'M',13896,14036,true,'Misc.');
Ware('mc','Microchips',11725,13476,15227,2,'S',12533,14419,false,'Tech');
Ware('mds','Mobile Drilling System',67001,77908,88815,100,'XL',67001,77908,true,'Weapon');
Ware('mos','Mosquito Missile',126,168,210,1,'S',126,168,true,'Missile');
Ware('nrs','Navigation Relay Satellite',5797,6740,7683,3,'M',5797,6740,true,'Misc.');
Ware('nee','Needle',6673,6740,6807,2,'S',6673,6740,true,'Missile');
Ware('nvm','Nividium',8064,16128,24192,4,'XL',11290,16128,false,'Mineral');
Ware('no','Nostrop Oil',26,72,118,3,'M',67,77,false,'Food');
Ware('ore','Ore',50,128,206,8,'XL',111,145,false,'Mineral');
Ware('pac','Particle Accelerator Cannon',34671,38956,43241,3,'S',34671,38956,true,'Weapon');
Ware('pbg','Plasma Burst Generator',109266,128548,147830,7,'S',109266,128548,true,'Weapon');
Ware('pm','Phantom Missile',20888,22460,24032,1,'M',20888,22460,true,'Missile');
Ware('prg','Phased Repeater Gun',133130,149584,166038,4,'S',133130,149584,true,'Weapon');
Ware('psg','Phased Shockwave Generator',567174,623268,679362,28,'L',567174,623268,true,'Weapon');
Ware('ppc','Photon Pulse Cannon',878810,934904,990998,100,'XL',878810,934904,true,'Weapon');
Ware('plk','Plankton',10,20,30,1,'S',18,22,false,'Bio');
Ware('psp','Point Singularity Projector',957856,1029952,1102048,200,'XL',957856,1029952,true,'Weapon');
Ware('pom','Poltergeist Missile',3032,3368,3704,2,'S',3032,3368,true,'Missile');
Ware('pro','Protein Paste',10,32,54,2,'S',29,35,false,'Bio');
Ware('pmaml','Prototype Matter/Anti-Matter Launcher',442835,451872,460909,21,'M',442835,451872,true,'Weapon');
Ware('pssc','Prototype Starburst Shockwave Cannon',567174,623268,679362,28,'XL',567174,623268,true,'Weapon');
Ware('pbe','Pulsed Beam Emitter',214405,249308,284211,8,'M',214405,249308,true,'Weapon');
Ware('qt','Quantum Tubes',2560,3368,4176,5,'M',3133,3603,false,'Tech');
Ware('rm','Rapier Missile',1079,1348,1617,1,'S',1079,1348,true,'Missile');
Ware('ro','Rastar Oil',252,484,716,6,'M',446,522,false,'Food');
Ware('rd','Recon Drone',28076,28076,28076,2,'S',28076,28076,true,'Tech');
Ware('rgw','Remote Guided Warhead',24257,26952,29647,3,'S',24257,26952,true,'Missile');
Ware('scf','Scruffin Fruits',7,20,33,2,'S',18,22,false,'Bio');
Ware('sm','Shadow Missile',49610,53344,57078,18,'L',49610,53344,true,'Missile');
Ware('sil','Silicon Wafers',232,504,776,18,'XL',464,544,false,'Mineral');
Ware('swm','Silkworm Missile',4295,5052,5809,2,'S',4295,5052,true,'Missile');
Ware('sl','Slaves',702,1404,2106,2,'S',0,1404,false,'Misc.');
Ware('sb','Soja Beans',14,28,42,1,'S',25,31,false,'Bio');
Ware('sh','Soja Husk',204,364,524,4,'S',335,393,false,'Food');
Ware('spf','Space Fuel',204,728,1252,2,'S',583,873,false,'Food');
Ware('spw','Space weed',903,2912,4921,6,'S',2680,3144,false,'Food');
Ware('sfl','Spaceflies',1853,3088,4323,1,'S',2316,3860,false,'Misc.');
Ware('spm','Wraith Missile',6681,7860,9039,5,'M',6681,7860,true,'Missile');
Ware('sqm','SQUASH Mine',7379,10108,12837,5,'L',7379,10108,true,'Misc.');
Ware('ssc','Starburst Shockwave Cannon',604570,623268,641966,28,'L',604570,623268,true,'Weapon');
Ware('ss','Stott Spices',47,72,97,1,'S',67,77,false,'Food');
Ware('suf','Sunrise Flowers',5,20,35,1,'S',18,22,false,'Bio');
Ware('swp','Swamp Plant',36,156,276,3,'S',147,165,false,'Bio');
Ware('td','Teladianium',57,156,255,5,'M',132,180,false,'Bio');
Ware('tem','Tempest Missile',11859,13476,15093,1,'S',11859,13476,true,'Missile');
Ware('emp','Terran EMP Rifles',39889,53904,67919,7,'S',39889,53904,true,'Tech');
Ware('tmre','Terran MRE',152,292,432,2,'S',269,315,false,'Food');
Ware('thm','Thunderbolt Missile',7245,8424,9603,1,'S',7245,8424,true,'Missile');
Ware('tmm','Tomahawk Heavy Missile',20888,22460,24032,2,'M',20888,22460,true,'Missile');
Ware('tom','Tornado Missile',14992,16844,18696,3,'S',14992,16844,true,'Missile');
Ware('trm','Tracker Mine',7379,10108,12837,6,'L',7379,10108,true,'Misc.');
Ware('trb','Tractor Beam',763507,779088,794669,50,'S',763507,779088,true,'Misc.');
Ware('tym','Typhoon Missile',30323,33692,37061,3,'S',30323,33692,true,'Missile');
Ware('vita','Vita Kai',42,104,166,4,'S',97,111,false,'Bio');
Ware('wh','Warheads',168,224,280,4,'L',168,224,true,'Tech');
Ware('wam','Wasp Missile',1079,1348,1617,1,'S',1079,1348,true,'Missile');
Ware('h2o','Water',10,32,54,2,'S',29,35,false,'Bio');
Ware('wfm','Wildfire Missile',2863,3368,3873,1,'S',2863,3368,true,'Missile');
Ware('wsm','Windstalker Missile',5864,6740,7616,1,'S',5864,6740,true,'Missile');
Ware('wm','Wraith Missile',30323,33692,37061,1,'L',30323,33692,true,'Missile');

/*
     FILE ARCHIVED ON 05:29:02 Aug 19, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:05:37 Aug 28, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/