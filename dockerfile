FROM centos:7

# Instal node
RUN yum install -y epel-release
RUN yum install -y nodejs

# buildpack-deps for node modules
RUN yum install -y bzip2 git make gcc gcc-c++

RUN npm i webpack nodemon -g

COPY . .

# Install deps
RUN cd ./api && npm i
RUN cd ./app && npm i && cd ..

WORKDIR ./

CMD ["npm", "run", "start"]