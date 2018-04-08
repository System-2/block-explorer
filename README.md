
## Команда №23

  

**Обозреватель блоков**  **#6**

  

  

**Задание от Ergo Platform**

  

  

Нужен сайт, на котором можно посмотреть актуальное состояние сети ERGO, свои транзакции, блоки, статистику. Основная функция — удобная навигация по данным, поэтому минималистичный дизайн, максимальная скорость и удобство (за основу можно взять любой существующий обозреватель блоков, например, [https://blockchain.info](https://blockchain.info/)).

  

  

**Нужно иметь возможность:**

  

- Посмотреть список последних блоков;

- По клику на блок посмотреть данные блока;

- Переходить по ссылкам в блоке (на родительский блок или

на блоки из interlinks);

- По клику на транзакцию в блоке — посмотреть данные транзакции;

-  _Опционально:_ при наличии времени можно реализовать большое количество других функций, например, показывать графики со статистическими данными — количество транзакций в блоке, распределение майнеров и т.д. (опять же, за основу можно взять [https://blockchain.info/charts](https://blockchain.info/charts)). Дополнительные фичи можно обсуждать в процессе хакатона по запросу.


## Запуск
Перед запуском необходимо [установить MongoDB](https://docs.mongodb.com/manual/installation/)
После установки MongoDB ввести:

    npm start

## API

 * ### GET /blocks/last/{count}
   Example: http://example.com/api/v1/blocks/last/3
   Response body:
	```json
	[
	  {
	    "id": "5BUe9Fsv9V6CbXNtpzJWYw92irHzA57o66vwaxCsmmk",
	    "height": 51926,
	    "time": 220885,
	    "bits": 33601536,
	    "txs": 11,
	    "miner": "GoCjJWT"
	  },
	  {
	    "id": "1PYkxpJVDyp8JuVGe18g66KWN7VPHBYv1NiiDcDVUbK",
	    "height": 51927,
	    "time": 178853,
	    "bits": 33611264,
	    "txs": 1,
	    "miner": "GoCjJWT"
	  },
	  {
	    "id": "1jAAipLHCewjr1mjf2TmuEUhaDv7BkWeovBGxSsYnfy",
	    "height": 51928,
	    "time": 130188,
	    "bits": 33613312,
	    "txs": 11,
	    "miner": "PKBCDuV"
	  }
	]
	```
* ### GET /blocks/{headerId}
   Example: http://example.com/api/v1/blocks/1PYkxpJVDyp8JuVUbK...
   Response body:
	```json
	  "id": "1PYkxpJVDyp8JuVGe18g66KWN7VPHBYv1NiiDcDVUbK",
	  "height": 51927,
	  "time": 1523181934325,
	  "bits": 33611264,
	  "difficulty": "222",
	  "nonce": -265955456825544320,
	  "parentId": "5BUe9Fsv9V6CbXNtpzJWYw92irHzA57o66vwaxCsmmk",
	  "txs": {
	    "headerId": "1PYkxpJVDyp8JuVGe18g66KWN7VPHBYv1NiiDcDVUbK",
	    "transactions": [
	      {
	        "id": "3QyvLj9J4TEQ7Tqn8yYg4bxAQiPPgy2gb3jTDtbPaUHU",
	        "inputs": [
	          {
	            "id": "4RxKv6fVBQrPHmbNUqktRuFJXCgQJ31dJYXT8jzVgHr8",
	            "nonce": -6290168410276172000,
	            "signature": ""
	          }
	        ],
	        "outputs": [
	          {
	            "script": "",
	            "value": 2500
	          }
	        ]
	      }
	    ]
	  },
	  "interlinks": [
	    "5CBFsnFA67379N8Em59skSQUwDuK3VHoeCZ92DPWaPd7",
	    "12wyUQdmSb6zM2KdRdQNhqrSHouWdJ8t1kaHgry7Bz5q",
	    "168duav3EdsPjeeSEJ1TWBgEvEgVzKCCqv1yKvLANq4",
	    "168duav3EdsPjeeSEJ1TWBgEvEgVzKCCqv1yKvLANq4",
	    ...
	  ]
	}
	```
* ### GET /txns/{limit}/{page}
  Example: http://example.com/api/v1/txns/3/1
  Response body:
  ```json
  [
	  {
	    "txn": "4vatmkAqyQHqVm2DV6oz2SzFKuRqJZrMjkdkyyD8vyL7",
	    "block": "14sZaa6w6p4c7iGxM5fipJJ5nFH6WPUwS9FSoaN5W4Le",
	    "from": "38oMKUe8shSYwixYktNKMbvfmsQe37REPBipQPBdb1gf",
	    "value": 10000
	  },
	  {
	    "txn": "DBeUHTvvRqnAEJUA4nzf2zrEwfPgky5ziUNSDsFxNwwb",
	    "block": "5DNkAfQuxmVKCD3kKhSJDZxPFvrLQ9ypDFFojevFihH",
	    "from": "FwUC9KnHtHM6oD2qDc6dXBoXAYZfAFL1cXpZttG7VTCs",
	    "value": 10000
	  },
	  {
	    "txn": "5Gcis7f5rQbFTemLPEArgXP1VnsZSiXVtCJH6NtKWFWx",
	    "block": "4y5YbG9BDTjyFwdsJkFRJgjHqC3uff2aaHGLYpUCFc7",
	    "from": "7u234ikcQt5pWCoWYoJ9gHgEPaTjzQWrY6B3MQmAUDy2",
	    "value": 10000
	  }
  ]
  ```
* ### GET /txn/:blockId/:id
  Example: http://example.com/txn/14sZaa6w6p4c7iGxM5.../4vatmkAqyQHq2DV6oz2S...
  Response body:
  ```json
  {
	  "from": "38oMKUe8shSYwixYktNKMbvfmsQe37REPBipQPBdb1gf",
	  "to": "DCWWCqgayYtw8vsTqSDNsMe8LELyvtC4vR8C4GGXD91H",
	  "nonce": 5770827049838035000,
	  "value": 10000,
	  "blockHash": "14sZaa6w6p4c7iGxM5fipJJ5nFH6WPUwS9FSoaN5W4Le",
	  "script": ""
  }
  ```
* ### GET /stat/txns/{limit}
  Example: http://example.com/stat/txns/3
  Response body:
  ```json
  [
	  {
	    "items": 12,
	    "count": 1
	  },
	  {
	    "items": 11,
	    "count": 2
	  }
  ]
  ```
* ### GET /stat/difficulty/{limit}
  Example: http://example.com/stat/difficulty/3
  Response body:
  ```json
  [
	  "51",
	  "198",
	  "35"
  ]
  ```
* ### POST /search
  Example: http://example.com/search
  Request body:
  ```json
  [
	  {
		  "hash": blockHeight || headerId
	  }
  ]
  ```
  Response body:
  ```json
  {
    "id": "12MZ7zFFLhfsfwXhgzP6C8WMGnL9TBF7iZwXE6Kma3Nv",
    "height": 51000,
    "time": 1523039004460,
    "bits": 33598720,
    "difficulty": "173",
    "nonce": 2020933866906665000,
    "parentId": "13Q6AH4EGnnNx9XXm3m1vMWGu47NbizvQRjmwqyiy2tn",
    "txs": {
        "headerId": "12MZ7zFFLhfsfwXhgzP6C8WMGnL9TBF7iZwXE6Kma3Nv",
        "transactions": [
            {
                "id": "4FLSHzgVCqMj13dwqbe7yDXGjX7KDLfSU6nYatfpmCXH",
                "inputs": [
                    {
                        "id": "GTpvvoLxzh9mPQzisq6aBmyfu3viwpQCFNR2478vcsZ7",
                        "nonce": 960678564278185000,
                        "signature": ""
                    }
                ],
                "outputs": [
                    {
                        "id": "Ck8iNJYVtpGwQgPmomZHRLMSuvXn7CSn3xZ3uZJNaMd4",
                        "script": "",
                        "value": 5000
                    }
                ]
            }
        ]
    },
    "interlinks": [
        "5CBFsnFA67379N8Em59skSQUwDuK3VHoeCZ92DPWaPd7",
        "13Q6AH4EGnnNx9XXm3m1vMWGu47NbizvQRjmwqyiy2tn",
        "1habxZc9hPcyHVapWYmtMKV15jA3PCcigFvA3xVhBUf",
        "1RvQgytRxtG8hMb7QXT48hNCA1oFhWB7Aok3QMqyphX",
        "15v7vmiDfkoThfwuU5Y92kJ98ntaKigvbPZ131bFhyB",
        "15v7vmiDfkoThfwuU5Y92kJ98ntaKigvbPZ131bFhyB",
        "11SNcp9wK6tUv1asK2zQM9X2K47SEBwLLjLdEMLWP4S",
        "11SNcp9wK6tUv1asK2zQM9X2K47SEBwLLjLdEMLWP4S",
        "11SNcp9wK6tUv1asK2zQM9X2K47SEBwLLjLdEMLWP4S",
        "11SNcp9wK6tUv1asK2zQM9X2K47SEBwLLjLdEMLWP4S",
        "113Da8B1NZJUtGZf48qDZncPp17Bri6AMpUhctExr39",
        "113Da8B1NZJUtGZf48qDZncPp17Bri6AMpUhctExr39",
        "113Da8B1NZJUtGZf48qDZncPp17Bri6AMpUhctExr39",
        "1116rLnqyMrgWYr7T9M7nE4MVEoaj5bnttKC8BCmkZK",
        "1116rLnqyMrgWYr7T9M7nE4MVEoaj5bnttKC8BCmkZK",
        "1116rLnqyMrgWYr7T9M7nE4MVEoaj5bnttKC8BCmkZK",
        "1116rLnqyMrgWYr7T9M7nE4MVEoaj5bnttKC8BCmkZK",
        "1116rLnqyMrgWYr7T9M7nE4MVEoaj5bnttKC8BCmkZK"
    ]
  }
  ```
