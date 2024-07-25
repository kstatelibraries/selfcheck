# Selfcheck

Alma Self-Checkout application (fork) that can run in a contact-free environment (using a scanner).

## About

### KSU Specific

K-State Libraries  forked this as a PoC for self-checkout in Vet teaching hospital library.

It is deployed to libutil, and has DNS at selfcheck.library.colostate.edu.

It is managed with systemd, so to start/stop/restart use the appropriate `systemctl` functions.

It is deployed with Ansible, so if changes need to be made make them to the ksu-branded branch of this repo, then on the Ansible host run the libutil playbook with the `selfcheck` flag to deploy changes.

To change the timeout, change the `LOGOUT_TIME_LIMIT` value in `client/src/App.js` and rebuild/redploy with Ansible.

The app is IP-based, which is controlled in the Apache config. To change this, changed the IPs allowed in `/etc/apache2/sites-available/selfcheck.library.colostate.edu.conf`. The config.js file in the projects root only sees the localhost address, changing things here will not have the intended effect.

### General

This web app utilizes the Alma API to power a self checkout station. There are two components to the selfcheck app: a client and a server.

The (node) server proxies ALMA api requests so that secrets don't have to be shared with clients. The server also filters ip addresses so that access is limited to intended sources.

The (react + tailwind) client facilitates touchless interaction, given the availability of a barcode scanner. This application has been built with the aim of making the library covid-safe by supporting touch free interactions for all user input.

## Installation

### Server

1. Clone the repository to your machine.
1. Run `npm install` in the cloned directory.
1. Copy `example_config.js`, rename it to `config.js`, and set the configuration variables.
1. Set your node env port if you don't want it to run on 3000 (recommended).
1. Optionally, set up an Apache reverse proxy, and limit to the IP address(es) of your kiosk(s). The server can only handle requests from IPs in the configuration file.

### Client

1. Navigate to the `/client` directory
1. Run `npm install` and `npm run build` to set up the client. The server will serve the client directly from `/client/build/` which is generated in the `npm run build` step.

## Run

Once you have completed the installation steps:

```
node main.js
```

## Development

To get the benefits of hot reloading that come with create-react-app, this workflow works:

1. Modify `client/src/api/apiConstants.js` so that port is hardcoded to 3000 (never push this change).
1. Run `node main.js` (now listening on 3000).
1. In `/client`, instead of `npm run build`, run `npm start`. This will probably try to host on port 3000 and ask if you'd like to use a different port. Choose yes (it will probably host on 3001).

Now, http://localhost:3001 is the create-react-app webpack hosted version of the client (it's not being served by the server). This means that client side code updates hot-reload and server requests continue working (because you hardcoded the port and started the server to begin with).
