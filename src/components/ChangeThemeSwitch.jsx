import {
	FormGroup,
	Grid,  
    IconButton,
    Switch,
    Typography
} from '@material-ui/core';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';


const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.primary[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const Div = styled(Typography)`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-end;

	transform: translateX(30%);

	span.MuiSwitch-track,
	span.MuiSwitch-thumb	 {
		background: white !important;
	}

	span.MuiButtonBase-root.MuiIconButton-root {
		background: darkgray;
	}
`;


const ChangeThemeSwitch = ({ changeFn, checked }) => {			
	return <AnimatePresence>
		<FormGroup>
      		<Div component="div">
        		<Grid component="div" container alignItems="center" spacing={1}>		
					<Grid item>
						<IconButton
							aria-label="sun icon"
							aria-controls="menu-appbar"
							aria-haspopup="false"
							// onClick={handleMenu}
							color="inherit"
							style={{ paddingRight: 0 }}>
								{checked === true ? <motion.div
									initial={{opacity: 0, x: 10, scale: 0 }}
									animate={{ opacity: 1, x: 0, scale: 1 }}
									exit={{ opacity: 0, x: 10 }}
									style={{ display: 'flex', alignItems: 'center'}}>
									<Brightness7Icon />
								</motion.div> : <motion.div
									initial={{opacity: 1, x: 0}}
									animate={{ opacity: 0, x: 25 }}
									exit={{ opacity: 1, x: 0 }}>
									<Brightness7Icon />
								</motion.div>}
						</IconButton>						
					</Grid>	
					<Grid item>
						<AntSwitch checked={checked} name="checked" onChange={changeFn} />
					</Grid>				
					<Grid item>
						{checked === false ? <motion.div
							initial={{ opacity: 0, x: -10, scale: 0}}
							animate={{ opacity: 1, x: 0, scale: 1 }}
							exit={{ opacity: 0, x: -10 }}
							transition={{ ease: "easeOut", duration: .195 }}>
							<IconButton
								aria-label="moon icon"
								aria-controls="menu-appbar"
								aria-haspopup="false"
								color="inherit"
								style={{ paddingLeft: 0 }}>	
								<Brightness2Icon />								
							</IconButton>						
						</motion.div> : <motion.div
							initial={{ opacity: 1, x: 0 }}
							animate={{ opacity: 0, x: -25  }}
							exit={{ opacity: 1, x: 0 }}
							transition={{ ease: "easeOut", duration: .195 }}>
							<IconButton
								aria-label="moon icon"
								aria-controls="menu-appbar"
								aria-haspopup="false"
								color="inherit">	
								<Brightness2Icon />								
							</IconButton>						
						</motion.div>}	
					</Grid>
			</Grid>
			</Div>
		</FormGroup>
	</AnimatePresence>
}

export default ChangeThemeSwitch;