import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';
import { DeleteOutlined, SaveOutlined } from '@mui/icons-material';

import { EntriesContext } from '../../context/entries';
import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts/Layout';
import { EntryStatus, Entry } from '../../interfaces/entry';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({entry}) => {
  const { updateEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    }

    updateEntry(updatedEntry, true);
  }

  return (
    <Layout title={inputValue.substring(0,20) + '...'}>
      <Grid
        container
        justifyContent='center'
        sx={{marginTop: 2}}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader 
              title={'Entrada:'}
              subheader={dateFunctions.getFormatDistanceToNow(entry.createdAt)}
            />
            <CardContent>
              <TextField
                sx={{marginTop: 2, marginBottom: 2}}
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Nueva entrada'
                value={inputValue}
                onChange={onInputValueChange}
                helperText={isNotValid && 'Ingrese un valor'}
                onBlur={() => setTouched(true)}
                error={inputValue.length <= 0 && touched}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChange}
                >
                  {
                    validStatus.map(option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlined />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark'
        }}
      >
        <DeleteOutlined />
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;
