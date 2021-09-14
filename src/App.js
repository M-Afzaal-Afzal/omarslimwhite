import { useCallback, useEffect, useState, Fragment } from "react";
import {
	AppBar,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	makeStyles, Tab, Tabs,
	TextareaAutosize,
	Tooltip, Typography, useMediaQuery
} from "@material-ui/core";
// import MenuIcon from '@material-ui/icons/Menu';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { processLtr, processRtl } from "./utils";
import SwipeableViews from 'react-swipeable-views';
import './App.css'
import { TabPanel } from "./components/TabPanel";
import { useLocalStorage } from "./hooks/useLocalStorage";
// import Logo from './assets/logo.png'
// import SplashVideo from './assets/splash_video.m4v';


const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	textArea: {
		padding: '5px',
		cols: '20',

		width: '100%',
		maxWidth: '100%',

		maxHeight: '250px',
	},
	separator: {
		padding: '20px',
	},
	navbar: {
		width: '100%',
		'& .MuiTabs-flexContainer': {
			display: 'flex',
			// justifyContent: 'center',
		}
	},
	footer: {
		width: '100%',
		padding: '15px',
		marginTop: 'auto',
	},
	logo: {
		maxWidth: '96px',
	},
})

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

function App() {
	const [text, setText] = useState({
		before: '',
		after: '',
	});

	// const [videoIsRunning, setVideoIsRunning] = useState(true);
	const { check, get, set } = useLocalStorage();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const isWideLandscape = useMediaQuery('screen and (orientation:landscape) and (min-width: 600px)');
	const isMdOrLess = useMediaQuery('(max-width: 960px');
	const isPhone = isWideLandscape && 'ontouchstart' in window;
	const classes = useStyles();
	const [textDirection, setTextDirection] = useState('ltr');
	const [showDirection, setShowDirection] = useState(true);
	const [tabIndex, setTabIndex] = useState(0);
	const [colors, setColors] = useState({
		backgroundColor: '#9D00FF',
		navbarColor: '#C528FF',
		navText: 'black'
	})

	const menuItemOnClick = (idx) => {
		setTabIndex(idx);
		// setDrawerOpen(false);
	}

	const handleDarkMode = () => {
		if (colors.backgroundColor === '#eeeeee') {
			setColors({
				backgroundColor: '#9D00FF',
				navbarColor: '#C528FF',
				navText: 'black',
			})
		} else {
			setColors({
				backgroundColor: '#eeeeee',
				navbarColor: '#3a6ab4',
				navText: 'white',
			})
		}
	}

	const textProcessor = textDirection === 'ltr' ? processLtr : processRtl

	const processText = useCallback((text) => {
		const processedText = textProcessor(text, showDirection);

		setText(() => ({
			before: text,
			after: processedText,
		}));
		set('text', text);

	}, [showDirection, textProcessor, set])

	const clearText = () => {
		processText('');
	}

	useEffect(() => {
		if (check('text')) {
			const text = get('text');
			processText(text);
		}
	}, [])

	useEffect(() => {
		if (text.before) {
			const processedText = textProcessor(text.before, showDirection);

			setText((oldText) => ({
				...oldText,
				after: processedText,
			}));
		}
	}, [showDirection, text.before, textProcessor])

	const handleChange = (event, newValue) => {
		setTabIndex(newValue);
	};

	const navLinksText = ['Home', 'Donate', 'Rights to use', 'How it all began', 'Legal', 'About the inventor'];
	const appBar = <AppBar
		position="static"
		style={{
			backgroundColor: colors.navbarColor,
			color: colors.navText
		}}
	>
		{/*{isMdOrLess &&*/}
		{/*<div style={{display: 'flex', justifyContent: 'space-around'}}>*/}

		{/*    <IconButton edge="start" color="inherit" aria-label="menu"*/}
		{/*                onClick={() => setDrawerOpen(!drawerOpen)}>*/}
		{/*        <MenuIcon/>*/}
		{/*    </IconButton>*/}
		{/*    <img src={Logo} className={classes.logo}/>*/}
		{/*</div>*/}
		{/*}*/}

		{/*{isMdOrLess &&*/}
		{/*<Drawer anchor='top' open={drawerOpen} onClose={() => setDrawerOpen(false)}>*/}
		{/*    <List>*/}
		{/*        {navLinksText.map((v, i) =>*/}
		{/*            <ListItem key={v} button onClick={() => menuItemOnClick(i)} {...a11yProps(i)}>*/}
		{/*                <ListItemText primary={v}/>*/}
		{/*            </ListItem>*/}
		{/*        )}*/}
		{/*    </List>*/}
		{/*</Drawer>*/}
		{/*}*/}

		{/*{!isMdOrLess &&*/}
		<Tabs value={tabIndex}
			onChange={handleChange}
			indicatorColor="primary"
			// scrollButtons="off"
			// textColor="primary"
			variant="scrollable"
			scrollButtons="on"
			aria-label="scrollable auto tabs example"
			style={{ justifyContent: 'flex-start' }}
		>
			{navLinksText.map((v, i) => <Tab key={i} wrapped label={v} {...a11yProps(i)} onClick={() => menuItemOnClick(i)} />)}
		</Tabs>
		{/*}*/}
	</AppBar>


	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: colors.backgroundColor,
				// height: '100%',
				minHeight: '100vh',
			}}>
			<nav className={classes.navbar}>
				<div className={classes.root}>
					{appBar}

				</div>
			</nav>

			<Container maxWidth='sm'
				style={{
					height: '100% ',
					background: colors.backgroundColor
				}}
			>
				<SwipeableViews
					axis={textDirection === 'rtl' ? 'x-reverse' : 'x'}
					index={tabIndex}
					onChangeIndex={(idx) => setTabIndex(idx)}
					style={{ height: '100%' }}
				>

					<TabPanel value={tabIndex} index={0} dir={textDirection}>
						<Grid container justifyContent='space-evenly' spacing={2}>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Tooltip title="Right-to-left languages like Arabic, Persian, Urdu">
											<Checkbox
												checked={textDirection === 'rtl'}
												onChange={() => setTextDirection(textDirection === 'ltr' ? 'rtl' : 'ltr')} />
										</Tooltip>
									}
									label="Hebrew"
								/>

								<FormControlLabel
									control={
										<Checkbox
											checked={showDirection}
											onChange={() => setShowDirection(!showDirection)} />
									}
									label="Directions"
								/>

								<Button onClick={handleDarkMode}>
									Color mode
								</Button>

								<Button onClick={clearText}>
									Clear
								</Button>


							</Grid>

							<Grid item xs={isPhone ? 6 : 12}>
								<TextareaAutosize
									className={classes.textArea}
									minRows={12}
									maxRows={20}
									placeholder={'Start typing..'}
									value={text.before}
									dir={textDirection}
									onChange={(evt) => processText(evt.target.value)}
								/>

							</Grid>

							<Grid item xs={isPhone ? 6 : 12}>
								<TextareaAutosize
									className={classes.textArea}
									minRows={12}
									maxRows={20}
									placeholder={'Start typing..'}
									value={text.after}
									dir={textDirection}
									readOnly={true}
								/>
							</Grid>

						</Grid>
					</TabPanel>
					<TabPanel value={tabIndex} index={1} dir={textDirection}>
						<Typography>
							Every dollar will be used to change the world. Your contributions allow myself to focus
							on
							other
							technologies that will expand the consciousness of humanity.
							The next project that I’m working on is a very soohiscated bartering system.
							Economically
							many
							people have faced adversity in the world. Just because money may be limited to some,
							doesn’t
							mean
							people cant receive the things they desire through bartering, which is a very ancient
							practice.
							One BEING has something that the other BEING has and both beings have something of value
							to
							exchange. I’m really excited about this project so stays tuned for more projects
							centered
							around
							planetary shifting❤️
						</Typography>
						<div className={classes.separator} />
						<Button variant='contained'>
							Donate
						</Button>
					</TabPanel>
					<TabPanel value={tabIndex} index={2} dir={textDirection}>
						<Typography>
							Everyone and I mean everyone in the world has my blessings to physically write in this
							new
							format. If you want to use this technology in your software or other tech based projects
							then
							you must send all the details, so that we can agree on the terms.
							If you want to simply use the technology on this website or even download it to your
							device
							then
							I humbly ask that you spread the word and leave feedback.
							All suggestions are welcomed to Suggestions@DivineRewind.com
							<br />
							If you really like this system and would like to support more creative ideas then click
							here
						</Typography>
					</TabPanel>
					<TabPanel value={tabIndex} index={3} dir={textDirection}>
						<Typography>In 2015 I created the system that you see.
							It started from me trying to figure out what way can I elevate the way people operate.
							Make sure outside of this technology that you incorporate this practice in your daily
							life.
							If you have a habit of brushing your teeth with your right hand then switch it up and
							use
							your left hand. If you’re comfortable with driving with your left hand on the steering
							wheel, see how you feel when driving with your right hand. These are small examples of
							making sure you push your limits.
							I love you with my highest love.
							~Omar Mashiach White~</Typography>
					</TabPanel>
					<TabPanel value={tabIndex} index={4} dir={textDirection}>
						<Typography>This technology isn’t meant to cure or treat any illness. Use this system at
							your
							own discretion. I assume no liability for anything that has been said or created. You
							have
							your own free will and discernment. Use what makes you feel whole.
							If you don’t like what is being presented you’re more than welcome to go back to what
							makes
							you feel comfortable.
							I love you with my highest love</Typography>
					</TabPanel>
					<TabPanel value={tabIndex} index={5} dir={textDirection}>
						<Typography>
							Hi, my name is Omar Mashiach White and in 2015 I invented a writing system that will
							change
							the
							way that we write, type and text. I believe that this technological system has the
							ability
							to
							realign both hemispheres of the brain.
							Here’s what I mean :)
							In the english writing system, there’s a starting point and then words travel in a right
							direction.
							In the Hebrew writing system, there’s a starting point and then words travel in a left
							direction.
							Now imagine what happens when the words travel in both directions? I’m honored to share
							with
							the
							world something that’s unique to our reality.
							I’m humble that you have considered using this divine system and I pray that you enjoy
							it❤️
							Much love and success on your journey
						</Typography>
					</TabPanel>
				</SwipeableViews>
			</Container>

			<div className={classes.footer} style={{ backgroundColor: colors.navbarColor }}>
				<Grid container justifyContent='center'>
					<a href='https://facebook.com/devinerewind' target='_blank'>
						<FacebookIcon style={{ color: 'white' }} />
					</a>

					<a href='https://twitter.com/devinerewind' target='_blank'>
						<TwitterIcon style={{ color: 'white' }} />
					</a>

					<a href='https://instagram.com/devinerewind' target='_blank'>
						<InstagramIcon style={{ color: 'white' }} />
					</a>
				</Grid>

			</div>
		</div>

	);
}

export default App;

const data = [
	{
		name: "for agents",
		options: [
			{
				optName: "",
				imgUrl: "",
				heading: "",
				subHeading: "",
				url: "",
				description: "",
			},
			{
				optName: "",
				imgUrl: "",
				heading: "",
				subHeading: "",
				url: "",
				description: "",
			},
			{
				optName: "",
				imgUrl: "",
				heading: "",
				subHeading: "",
				url: "",
				description: "",
			},
		]
	},
	{
		name: "for offices",
		options: [
			{
				optName: "",
				imgUrl: "",
				heading: "",
				subHeading: "",
				url: "",
				description: "",
			},
			{
				optName: "",
				imgUrl: "",
				heading: "",
				subHeading: "",
				url: "",
				description: "",
			},
			{
				optName: "",
				imgUrl: "",
				heading: "",
				subHeading: "",
				url: "",
				description: "",
			},
		]
	},

]