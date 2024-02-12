import React, { useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AccountProps } from "./Accounts";
import { GetServerSideProps, GetStaticProps } from "next"
import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


export const getServerSideProps: GetServerSideProps = async () => {

    const res_checkings = await fetch(`http://localhost:3000/api/checkings/`);
    const checkings = await res_checkings.json();

    const res_savings = await fetch(`http://localhost:3000/api/savings/`);
    const savings = await res_savings.json();

    console.log('accounts', checkings, savings)

    return { 
      props: {
        checkings,
        savings
      }
    }
}
  

type Props = {
  checkings: AccountProps[],
  savings: AccountProps[],
}

const TransactionForm: React.FC = () => {
    const [typeOrigin, setTypeOrigin] = React.useState('checking');
    const [typeDestiny, setTypeDestiny] = React.useState('checking');
    const [accountOriginId, setAccountOriginId] = React.useState<number>();
    const [accountDestinyId, setAccountDestinyId] = React.useState<number>();
    const [checkings, setCheckings] = React.useState([]);
    const [savings, setSavings] = React.useState([]);
    const [amount, setAmount] = React.useState<number>(0);
    
    useEffect(() => {
        fetch(`http://localhost:3000/api/checkings/`).then(async res => {
            setCheckings(await res.json());
        });
        fetch(`http://localhost:3000/api/savings/`).then(async res => {
            setSavings(await res.json());
        });
    }, [])

    const handleChange = (event: SelectChangeEvent) => {
      setTypeOrigin(event.target.value);
    };

    const handleChangeDestiny = (event: SelectChangeEvent) => {
        setTypeDestiny(event.target.value);
    };

    const handleChangeAccountOrigin = (event: SelectChangeEvent) => {
        setAccountOriginId(parseInt(event.target.value));
      };
  
    const handleChangeAccountDestiny = (event: SelectChangeEvent) => {
        setAccountDestinyId(parseInt(event.target.value));
    };
    const handleChangeAmount = (event) => {
        setAmount(parseInt(event.target.value));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        //create transaction
        const body = JSON.stringify({
            amount,
            accountDestinyId,
            accountOriginId,
            typeDestiny,
            typeOrigin
        });
        console.log('creating transaction', body)

        await fetch('http://localhost:3000/api/transactions/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        }).then( async res => {
            const data = await res.json(); 
            console.log('request finished', data)

            if(res.status === 200) alert('Fund was transfered');
            else alert(`Error in sending your fund ${data['error']}`);
        })
    }
    return (
        <div>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-helper-label">Account Origin Type</InputLabel>
            <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={typeOrigin}
            label="Account Origin Type"
            onChange={handleChange}
            >
            <MenuItem value={'checking'}>Checking</MenuItem>
            <MenuItem value={'saving'}>Saving</MenuItem>

            </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
            <Select label="Account Origin" onChange={handleChangeAccountOrigin}>
                {typeOrigin == 'checking' 
                ?
                    checkings?.map( row => (
                        <MenuItem value={row.id}>{`${row.user.name} (${row.id})`}</MenuItem>
                    )) 
                :
                    savings?.map( row => (
                        <MenuItem value={row.id}>{`${row.user.name} (${row.id})`}</MenuItem>
                    )) 
                }
            </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-helper-label">Account Destiny Type</InputLabel>
            <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={typeDestiny}
            label="Account Destiny Type"
            onChange={handleChangeDestiny}
            >
            <MenuItem value={'checking'}>Checking</MenuItem>
            <MenuItem value={'saving'}>Saving</MenuItem>

            </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
            <Select label="Account Destiny" onChange={handleChangeAccountDestiny}>
                {typeDestiny == 'checking' 
                ?
                    checkings?.map( row => (
                        <MenuItem value={row.id}>{`${row.user.name} (${row.id})`}</MenuItem>
                    )) 
                :
                    savings?.map( row => (
                        <MenuItem value={row.id}>{`${row.user.name} (${row.id})`}</MenuItem>
                    )) 
                }
            </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
            <TextField id="outlined-basic" label="amount"  type="number" onChange={handleChangeAmount} />
        </FormControl>
        <FormControl>
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
            Transfer
        </Button>
        </FormControl>
        </div>
  );
};

export default TransactionForm
