FROM golang:1.12.9-stretch as builder

RUN mkdir /api-escola
WORKDIR /api-escola

ADD go.mod .
ADD go.sum .

RUN go mod download

ADD ./src ./src
ADD main.go .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o /go/bin/api-escola .

FROM alpine

COPY --from=builder /go/bin/api-escola /app/

WORKDIR /app
CMD ["./api-escola"]
