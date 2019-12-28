# https://mherman.org/blog/dockerizing-an-angular-app/


#############
### build ###
#############

# base image
FROM node

# install chrome for protractor tests
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# add app
COPY . .

# install dependencies
RUN npm install
RUN npm install -g @angular/cli


#############
### local ###
#############

# start app
CMD ng serve --host 0.0.0.0