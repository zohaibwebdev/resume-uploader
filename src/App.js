import {Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Box, Alert, InputLabel, MenuItem, Select, FormControl, FormLabel, RadioGroup, Radio, FormGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {  useState } from 'react'
import {styled} from '@mui/material/styles'

function App() {

  const Input = styled('input')({
    display: 'none'
  })


  //states
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const  [dob, setDob] = useState(null);
  const [loc, setLoc] = useState('');
  const [pjl, setPjl] = useState([])
  const [pimage, setPimage] = useState('');
  const [file, setFile] = useState('');
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: ''
  })
  
  const getPjl = e =>{
    let data = pjl
    data.push(e.target.value)
    setPjl(data)
  }


const resetForm = (e) =>{
  setName('')
  setEmail('')
  setGender('')
  setDob(null)
  setPjl([])
  setLoc('')
  setPimage('')
  setFile('')
}


const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData()
  data.append('name', name)
  data.append('email', email)
  data.append('gender', gender)
  data.append('dob', dob)
  data.append('location', loc)
  data.append('joblocation', pjl)
  data.append('profile', pimage)
  data.append('file', file)
  console.log(data)
  if (name && email){
    setError({status: true, msg:'Resume Upload Successfully', type:'success'})
    resetForm()
    document.getElementById('resume-form').reset()
  }else {
    setError({ status:true, msg:'all fields are required', type: 'error' })
  }
}

  
  return (
    <>
    <Box display='flex' justifyContent="center" sx={{backgroundColor:'error.light', padding: 2}}>
      <Typography variant='h2' component='div' sx={{fontWeight:'bold', color:'white'}}>Resume Uploader</Typography>
    </Box>
    <Grid container justifyContent="center">
      <Grid item xs={5}>
        <Box component="form" sx={{p: 3}} noValidate id="resume-form" onSubmit={handleSubmit}>
            <TextField id='name' name='name' label='name' margin='normal' required fullWidth onChange={(e)=> {setName(e.target.value)}} />
            <TextField id='email' name='email' label='Email' margin='normal' required fullWidth onChange={(e)=> {setEmail(e.target.value)}} />
            <Box mt="2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Dob"
                  value={dob}
                  onChange={(newValue) => {
                    setDob(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            </Box>
            <FormControl fullWidth margin='normal'>
                <InputLabel id="location-select">Location</InputLabel>
                <Select labelId='location-select' id='loc-select' value={loc} label='Location' onChange={(e)=> {setLoc(e.target.value)}}>
                  <MenuItem value="bahawalpur">Bahawalpur</MenuItem>
                  <MenuItem value="lahore">Lahore</MenuItem>
                  <MenuItem value="karachi">Karachi</MenuItem>
                  <MenuItem value="islamabad">Islamabad</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin='normal'>
              <FormLabel id='gender-radio'>Gender</FormLabel>
              <RadioGroup row name='gender'>
                <FormControlLabel value="male" control={<Radio />} label='Male' onChange={(e)=>{setGender(e.target.value)}}/>
                <FormControlLabel value="female" control={<Radio />} label='Female' onChange={(e)=>{setGender(e.target.value)}}/>
                <FormControlLabel value="others" control={<Radio />} label='Others' onChange={(e)=>{setGender(e.target.value)}}/>
              </RadioGroup>

            </FormControl>
            <FormControl component="fieldset" fullWidth margin='normal'>
              <FormLabel component="legend">Preferred Job Location</FormLabel>
              <FormGroup row name='pjl'>
                    <FormControlLabel control={<Checkbox />} label='Bahawalpur' value='bahawalpur' onChange={(e)=> {getPjl(e)}}/>
                  <FormControlLabel control={<Checkbox />} label='Lahore' value='lahore' onChange={(e)=> {getPjl(e)}} />
                  <FormControlLabel control={<Checkbox />} label='Karachi' value='karachi' onChange={(e)=> {getPjl(e)}} />
                  <FormControlLabel control={<Checkbox />} label='Islamabad' value='islamabad' onChange={(e)=> {getPjl(e)}} />
              </FormGroup> 
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={4}>
              <label htmlFor="profile-Photo">
                <Input accept='image/*' id='profile-photo' type='file' onChange={(e)=>{setPimage(e.target.files[0])}}/>
                <Button variant="contained" component='span'>Upload Photo</Button>
              </label>
              <label htmlFor="resume-file">
                <Input accept='doc/*' id='resume-file' type='file' onChange={(e)=>{setFile(e.target.files[0])}}/>
                <Button variant="contained" component='span'>Upload File</Button>
              </label>
            </Stack>
            <Box display='flex' justifyContent="center"><Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5}} color='error'>Submit</Button></Box>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert>: ''}
        </Box>
      </Grid>
      <Grid item xs={7}>
      <Box mt="2" display='flex' justifyContent="center" sx={{backgroundColor:'info.light', padding: 1}}>
      <Typography variant='h5' component='div' mt="2" sx={{fontWeight:'bold', color:'white'}}>List of Candidate</Typography>
    </Box>
    <TableContainer component={Paper}>
    <Table sx={{minWidth:650}} aria-label='simple'>
      <TableHead>
        <TableRow>
          <TableCell align="center">Name</TableCell>
          <TableCell align="center">Email</TableCell>
          <TableCell align="center">DOB</TableCell>
          <TableCell align="center">Location</TableCell>
          <TableCell align="center">Gender</TableCell>
          <TableCell align="center">Profile</TableCell>
          
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
          <TableCell align='center'>Zohaib</TableCell>
          <TableCell align='center'>zohaibfas@gmail.com</TableCell>
          <TableCell align='center'>07/06/1999</TableCell>
          <TableCell align='center'>Bahawalpur</TableCell>
          <TableCell align='center'>Male</TableCell>
          <TableCell align='center'><Avatar src='#' /></TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </TableContainer>
      </Grid>

    </Grid>
  </>
  );
}

export default App;
