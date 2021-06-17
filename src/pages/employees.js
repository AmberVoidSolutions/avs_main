import CardList from '../components/cardlist'


let employees = [ { category  : 'Officers',
						entries : [
								{ title : 'Charlie', subtitle : 'German Spitz', image : 'charlie', quote : 'I honestly don\'t understand why it isn\'t about Charlie right now.',
											description : 'Charlie helps the company execute both short- and long-term plans and directives with his judgement and vision, as well as his curled, fluffy tail. ' +
															' He develops growth strategies and presents new ideas for cash flow to the other company officers in order to purchase the best treats available.' }
						]
					},

				   { category  : 'Human Resources',
					 	entries : [
					 			{ title : 'Paco', subtitle : 'Chinchilla', image : 'paco', quote : 'Please don\'t talk to me until I\'ve had my run.',
					 						description : 'Responsible for handling the majority of communications, Paco plays an important role at AmberVoid Solutions Ltd. An excellent delegator, ' +
					 										'she can help - or find the right person to help - with any task. For best results, be sure to have an \'apple heart\' treat at the ready.' },
					 			{ title : 'Chico', subtitle : 'Chinchilla', image : 'chico', quote : 'If you touch me I will bite your tendons. How can I help?',
					 						description : 'The most respected of the HR trio, Chico handles the more troublesome of clients. Equally adept at solving clients\' issues, Chico will often take on ' +
					 										'the more difficult ones and hide away in the shadows. He only likes to work on one solution at a time, so if you find him hidden in ' +
					 										'his Thought Cube™, be sure to observe any hissing and perhaps find a more amenable HR representative.' },
								{ title : 'Billy Bob', subtitle : 'Gerbil', image : 'billybob', quote : 'Let\'s GOOOOOOO',
											description : 'Billy Bob is the least-seen of the HR trio, and is by far the best with small troubles. For the cost of a single pumpkin seed (unshelled), ' +
															'he will locate any information you require. He is excellent at managing disputes, so long as they are not gerbil-ine in nature.' },
					 	]
					 },

					{ category : 'Finance',
						entries : [
					 			{ title : 'Mice Pack', subtitle : 'Fancy Mice & Indian Soft Mice', image : 'mice', quote : '(Rhythmic mouse chewing ASMR)',
					 						description : 'The Mice Pack, internally referred to as \'The Hoarde\' are extremely voracious and will go through food at a rate of knots. Due to this, ' +
					 										'they are especially adept at ensuring that the company\'s finances are kept in order. When they aren\'t sleeping on top of each other ' +
					 										'or toppling over every waterbottle they can get their paws on, they observe the office to maintain maximum productivity.' },
					 	]
					 },

					{ category : 'Operations' ,
						entries : [
					 			{ title : 'Silver', subtitle : 'Degu', image : 'silver', quote : 'I wish to know where the seeds are',
					 						description : 'Silver is one of the Senior Operations managers, and keeps everybody else in check. He is well-mannered, but will not hesitate to put ' +
					 										'co-workers in their place. Not everybody likes this, but the outcome is unarguable and the results effective. When he\'s not running ' +
					 										'on his wheel, he\'s checking on logistics. He needs to know where those seeds are.' },
					 			{ title : 'Shadow the Degu', subtitle : 'Degu', image : 'shadow', quote : 'Wow, that\'s great, where are the seeds?',
					 						description : 'As his name suggest, Shadow is one of the night-shift workers. When others stop working, Shadow starts. Shadow joined as an apprentice to ' +
					 										'Rudy Jr., and has taken on many of his mannerisms, including an antagonistic personality. He\'s continually trying to prove himself one of ' +
					 										'the top dogs (or, should we say, top degus) and has been given a special department within which to oversee operations.' },
					 			{ title : 'Rudy Maritime Jr.', subtitle : 'Degu', image : 'rudyjr', quote : 'You are beneath me.',
					 						description : 'Taking over from his late, estranged, non-blood-related father that he never met, Rudy is almost polar opposite in attitude. He doesn\'t ' +
					 										'stand slackers and will make sure everyone knows it. ' },
					 			{ title : 'Kakashi', subtitle : 'Degu', image : 'kakashi', quote : 'In society, those who don\'t have many abilities tend to complain more.',
					 						description : 'Directly related to his father from Konoha Village, Kakashi is especially good at using insight to determine what needs to be done. ' +
					 										'His eyes see all and he is able to navigate the trecherous mazes of business operations. He has acquired his grandfather\'s moniker, ' +
					 										'the \'White Fang\' due to his colouring and use of his fangs.' },
					 			{ title : 'Relentless Marigold', subtitle : 'Degu', image : 'relentless', quote : 'It\'s not illegal if you can\'t catch me!',
					 						description : 'Nobody stops Relentless, and nobody can. One of the hardest workers of the lot, you\'ll have to keep up if you want anything from him! ' +
					 										'E-mail is probably best, he checks it every two-and-a-half minutes. His methods might not be kosher but his results are.' },
					 			{ title : 'Rocko', subtitle : 'Guinea Pig', image : 'rocko', quote : 'Is it food time yet? Food time? Food?? Time??',
					 						description : 'Rocko oversees the operations of food and refreshments, and is incredibly effective at maintaining schedule. If you ever notice a ' +
					 										'lack of food or drink, just wait a few minutes - invariably Rocko has already noticed and is working dilligently to rectify the ' +
					 										'problem.' },
					 	]
					 },

					{ category : 'Accountants',
						entries : [
					 			{ title : 'Sterling', subtitle : 'Degu', image : 'sterling', quote : 'Time to run, gotta run, let\'s chat while we run',
					 						description : 'Sterling is one of our eldest employees, but his years endow him with knowledge far past anyone else\'s. Often seen as liason between ' +
					 										'departments, Sterling is capable of managing account errors with professionalism and repose. Everybody loves Sterling, and we ' +
					 										'know he\'s got a lot of work left in him yet.' },
					 			{ title : 'Reggie', subtitle : 'Guinea Pig', image : 'reggie', quote : 'I\'m fabulous, there\'s your quote.',
					 						description : 'Do not be fooled by Reggie\'s perfect hair - he is an accomplished accountant and will process numbers like you\'ve never seen ' +
					 										'before. No amount of water is too much, and no amount of billing forms cannot be chewed up. Please leave requests on the ground ' +
					 										'floor, as he is unable to navigate higher levels.' },
					 	]
					 },

					{ category : 'Business Analysts',
						entries : [
					 			{ title : 'Waffles Jr.', subtitle : 'Degu', image : 'wafflesjr', quote : 'Heh heh heh, I am a master of disguise',
					 						description : 'Nobody can ever find Waffles Jr. unless he wants you to.' },
					 			{ title : 'Queen Mytha', subtitle : 'Ball Python', image : 'mytha', quote : 'Yes, but what is up really? Any direction can be up.',
					 						description : 'Although royalty, Queen Mytha does not let that get in the way of her duties. Everyone is equal, so long as they attend to her ' +
					 										'every need all the time. She refuses to be defined by her mental disabilities, and works diligently in the face of them. If you ' +
					 										'see her somewhere - or doing something - you don\'t expect, just ignore her - she\'s probably doing just fine!' },
					 	]
					},

					{ category : 'Security',
						entries : [
					 			{ title : 'Spiniel', subtitle : 'Spiny Mouse', image : 'spiny', quote : 'ID Or BiteMe. Haha, just a little rodent joke - because I\'m gonna bite you if you don\'t have ID',
					 						description : 'Head of Security, Spiniel keeps everything running smoothly. He is not afraid to jump around the cage in a flash to keep order, and his ' +
					 										'giant eyes keep stock of everything that happens. Please make sure to have your ID badge on display, he will bite you otherwise.' },
					 			{ title : 'Biscoff', subtitle : 'Gerbil', image : 'biscoff', quote : 'I will honestly do everything I can to get back into my woodchipping box',
					 						description : 'Biscoff is very amicable and will do whatever to help you with any situation that might require his assistance. He accepts unshelled ' +
					 										'pumpkin seeds as tips, and will make short work of whatever problems you are facing.' },
					 			{ title : 'Bourbon', subtitle : 'Gerbil', image : 'bourbon', quote : 'Was that another gerbil? That BAS-Oh, it wasn\'t? Are you sure?',
					 						description : 'The strictest of the security department, Bourbon will not hesitate to show bad actors out of the premises. If you do not have your ID ' +
					 										'readily available and your tail has a brush, be forewarned that you will lose it. This is non-negotiable.' },
					 	]
					}
				];


export default function Employees() {
	return (
		<CardList cards={ employees } />
	)
}