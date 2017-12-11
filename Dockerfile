FROM centos:7

# Instal node
RUN yum install -y epel-release
RUN yum install -y nodejs

# buildpack-deps for node modules
RUN yum install -y bzip2 git make gcc gcc-c++

RUN npm i webpack mocha jest nodemon -g

WORKDIR /fish

COPY ./package.json package.json
COPY ./.babelrc .babelrc

# Install deps
RUN npm i

CMD ["npm", "run", "dev:start"]