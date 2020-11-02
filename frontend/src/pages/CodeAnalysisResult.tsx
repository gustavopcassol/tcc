import React, {ChangeEvent, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import VerticalTabs, {Tab} from '../components/vertical_tabs/VerticalTabs';
import ViolationCase, {
  ViolationCaseProps,
} from '../components/violation_case/ViolationCase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SettingsMenu from '../components/settings/SettingsMenu';
import CodeSmellInformation from '../components/CodeSmellInformation';
import UploadButton from '../components/UploadButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadButton: {
      position: 'absolute',
      marginTop: theme.spacing(3.4),
      marginLeft: theme.spacing(3),
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    title: {
      margin: theme.spacing(3),
    },
    tabsPaper: {
      height: '66%',
      minWidth: '29.8%',
      margin: 'auto',
    },
    footer: {
      marginTop: 'auto',
    },
  })
);

export type CodeAnalysisResultProps = {
  codeSmellCasesList: Iterable<CodeSmellCases>;
};

export type CodeSmellCases = {
  codeSmell: string;
  cases: ViolationCaseProps[];
};

export default function CodeAnalysisResult(
  props: RouteComponentProps<{}, any, CodeAnalysisResultProps | any> // "any" is a Workaround.
) {
  const classes = useStyles();
  const codeSmellCasesList: CodeSmellCases[] =
    props.location.state.codeSmellCasesList;

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function createTabs(): Tab[] {
      const newTabs: Tab[] = [];
      for (const codeSmellCases of codeSmellCasesList) {
        const tabChildren: React.ReactNode[] = [];
        for (const codeSmellCase of codeSmellCases.cases) {
          tabChildren.push(<ViolationCase {...codeSmellCase} />);
        }
        const newTab: Tab = {
          label: codeSmellCases.codeSmell,
          children: tabChildren,
        };
        newTabs.push(newTab);
      }
      return newTabs;
    }
    setTabs(createTabs());
    setLoading(false);
  }, [codeSmellCasesList]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    //todo fazer
  }

  if (loading) {
    return <></>;
  }
  if (tabs.length === 0) {
    return (
      <Typography variant="h1">
        Parabéns, nenhum code smell foi encontrado!
      </Typography>
    );
  }
  return (
    <>
      <UploadButton className={classes.uploadButton} onChange={handleChange}>
        novo upload
      </UploadButton>
      <SettingsMenu />
      <Container className={classes.mainContainer}>
        <Typography className={classes.title} variant="h2">
          Resultado da Análise
        </Typography>
        <Paper variant="outlined" square className={classes.tabsPaper}>
          <VerticalTabs tabs={tabs} />
        </Paper>
        <CodeSmellInformation className={classes.footer} />
      </Container>
    </>
  );
}
