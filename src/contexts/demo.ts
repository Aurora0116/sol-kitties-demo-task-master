export type Demo = {
  version: "0.1.0";
  name: "demo";
  instructions: [
    {
      name: "initialize";
      docs: ["* This is the initialize function to use this program"];
      accounts: [
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "setVariable";
      docs: [
        "* This is the variable setting function\n     * @param end_ts  end timestamp of the sweeping\n     * @param ticket_price Set the ticket price"
      ];
      accounts: [
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "endTs";
          type: "i64";
        },
        {
          name: "ticketPrice";
          type: "u64";
        }
      ];
    },
    {
      name: "initUserPool";
      docs: ["* Init User Pool which stores the deposit amount"];
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userPool";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "buyTickets";
      docs: [
        "* Buy Tickets function\n     * @param ticket_amount: Ticket amount to buy"
      ];
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "globalAuthority";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasuryWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "ticketAmount";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "globalPool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: "publicKey";
          },
          {
            name: "totalBoughtTickets";
            type: "u64";
          },
          {
            name: "ticketPrice";
            type: "u64";
          },
          {
            name: "endTimestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "userPool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "publicKey";
          },
          {
            name: "amount";
            type: "u64";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidAdmin";
      msg: "The Caller is Invalid Admin";
    },
    {
      code: 6001;
      name: "InvalidTimestamp";
      msg: "Now is the Invalid Timestamp";
    },
    {
      code: 6002;
      name: "AlreadyClaimed";
      msg: "It is Already Claimnd";
    },
    {
      code: 6003;
      name: "ExceedSol";
      msg: "Exceed the Limit of SOL";
    }
  ];
};

export const IDL: Demo = {
  version: "0.1.0",
  name: "demo",
  instructions: [
    {
      name: "initialize",
      docs: ["* This is the initialize function to use this program"],
      accounts: [
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "setVariable",
      docs: [
        "* This is the variable setting function\n     * @param end_ts  end timestamp of the sweeping\n     * @param ticket_price Set the ticket price",
      ],
      accounts: [
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "endTs",
          type: "i64",
        },
        {
          name: "ticketPrice",
          type: "u64",
        },
      ],
    },
    {
      name: "initUserPool",
      docs: ["* Init User Pool which stores the deposit amount"],
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPool",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "buyTickets",
      docs: [
        "* Buy Tickets function\n     * @param ticket_amount: Ticket amount to buy",
      ],
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "globalAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasuryWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "ticketAmount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "globalPool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            type: "publicKey",
          },
          {
            name: "totalBoughtTickets",
            type: "u64",
          },
          {
            name: "ticketPrice",
            type: "u64",
          },
          {
            name: "endTimestamp",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "userPool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidAdmin",
      msg: "The Caller is Invalid Admin",
    },
    {
      code: 6001,
      name: "InvalidTimestamp",
      msg: "Now is the Invalid Timestamp",
    },
    {
      code: 6002,
      name: "AlreadyClaimed",
      msg: "It is Already Claimnd",
    },
    {
      code: 6003,
      name: "ExceedSol",
      msg: "Exceed the Limit of SOL",
    },
  ],
};
