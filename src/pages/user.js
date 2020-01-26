import React, { useContext } from 'react';
import { Button } from 'baseui/button';
import { Label1 } from 'baseui/typography';

// Gatsby
import { navigate } from 'gatsby';
import { FirebaseContext } from 'gatsby-plugin-firebase';

// BaseUI
import { toaster, ToasterContainer, PLACEMENT } from 'baseui/toast';

// Components
import SEO from 'components/ui/Seo';
import Layout from 'components/ui/Layout';

const UserPage = () => {
  const firebase = useContext(FirebaseContext);

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => navigate('/'))
      .catch(() => toaster.negative('No te pudimos desloguear'));
  };

  return (
    <Layout>
      <ToasterContainer placement={PLACEMENT.bottomRight}>
        <SEO title="User" />
        <Label1>Change favorite cinema:</Label1>
        <Label1>Change favorite genre:</Label1>
        <Label1>Enable or disable newsletter:</Label1>
        <br />
        <Button onClick={handleLogOut}>Log out</Button>
      </ToasterContainer>
    </Layout>
  );
};

export default UserPage;
