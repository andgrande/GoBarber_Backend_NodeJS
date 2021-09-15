# GoBarber backend (Node.js)

Project developed during [Rocketseat](https://github.com/rocketseat-education) bootcamp

## Languages

- Node.js with Typescript

## Concepts and technologies applied in this project:

- Relational DB (PostgreSQL) and Non-relation DB (MongoDB and Redis)
- Docker containers
- SOLID principles
- Dependency injection
- ORM with typeorm
- Automated tests with Jest framework
- REST API

## Features included

- User authentication middleware and requests Data validation to secure APIs
- Upload of files
- Password encryption
- Template email and email sending functions
- Limit number of requests received per minute / IP
- Service configured to work with AWS S3

## List of services

| Name | Type | Description | Endpoint |
| ------------------- | ------------------- | ------------------- | ------------------- |
|  Users | `POST` | Register user | `hostURL`/users |
|  Users | `POST` | Autheticate user | `hostURL`/sessions |
|  Users | `POST` | Forgot password email | `hostURL`/password/forgot |
|  Users | `POST` | Reset password | `hostURL`/password/reset |
|  Users | `PATCH` | Update user's avatar | `hostURL`/users/avatar |
|  Users | `PUT` | Update profile | `hostURL`/profile |
|  Users | `GET` | Retrieve profile main data | `hostURL`/profile |
|  Appointments | `GET` | List all providers | `hostURL`/providers |
|  Appointments | `GET` | List provider appointments | `hostURL`/appointments/me |
|  Appointments | `GET` | List provider days Availability | `hostURL`/providers/`:id`/day-availability |
|  Appointments | `GET` | List providers Month Availability | `hostURL`/providers/`:id`/month-availability |
|  Appointments | `POST` | Create appointment | `hostURL`/appointments |
