FROM node:22

ARG user=kubeedge
ARG uid=1000

ENV DEBIAN_FRONTEND=noninteractive
ENV SHELL=/bin/bash

# Delete user if it exists in container (e.g node user)
RUN if id -u $uid ; then userdel `id -un $uid` ; fi

RUN apt-get update && \
    apt-get install yarn python3 python3-pip -y && \
    rm -rf /var/lib/apt/lists/* && \
    pip3 install --break-system-packages codespell

RUN useradd -u $uid -m $user
ENV HOME=/home/$user
ENV PATH=/home/$user/.local/bin:$PATH
WORKDIR /tmp/doc_repository

USER $user

CMD ["bash", "-c", "yarn install"]
