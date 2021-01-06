

    const reqObj = {
        method: 'GET',
        headers: {
          Authorization: `BEARER ${res.accessToken}`,
          'Content-Type': 'application/json',
        }
      }
      fetch(`https://gmail.googleapis.com/gmail/v1/users/${res.googleId}/messages`, reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
      })