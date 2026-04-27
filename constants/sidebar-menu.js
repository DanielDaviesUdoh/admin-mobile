export const menuData = [
  {
    title: "Routing",
    icon: "git-branch",
    children: [
      { title: "Routing", icon: "git-branch", path: "/routing" },
      { title: "Countries", icon: "flag", path: "/routing/countries" },
      {
        title: "Sender ID Replace",
        icon: "sync-outline",
        path: "/routing/senderidreplace",
      },
      { title: "Network List", icon: "cellular", path: "/routing/networklist" },
      {
        title: "Preferred Provider",
        icon: "globe-outline",
        path: "/routing/preferredprovider",
      },
      {
        title: "Provider Network",
        icon: "call",
        path: "/routing/providernetwork",
      },
      {
        title: "Designated Provider",
        icon: "wifi",
        path: "/routing/designatedprovider",
      },
      {
        title: "Network Prefix",
        icon: "cellular-outline",
        path: "/routing/networkprefix",
      },
      {
        title: "Provider Long Message Routing",
        icon: "send-outline",
        path: "/routing/providerlongmessagerouting",
      },
      { title: "Routing Log", icon: "list", path: "/routing/routednumber" },
    ],
  },

  {
    title: "Test Message",
    icon: "document-text",
    children: [
      {
        title: "Test Message",
        icon: "document-text",
        path: "/testmessage",
      },
      {
        title: "Test Result",
        icon: "pulse",
        path: "/testmessage/testresult",
      },
      {
        title: "Test My Number",
        icon: "phone-portrait-outline",
        path: "/testmessage/testmynumber",
      },
    ],
  },

  {
    title: "Phone Query",
    icon: "search",
    children: [
      {
        title: "Phone Query",
        icon: "search",
        path: "/phonequery",
      },
      {
        title: "locate msg by id",
        icon: "refresh",
        path: "/phonequery/locatemsgbyid",
      },
      {
        title: "Resubmit Message",
        icon: "mail-open-outline",
        path: "/phonequery/resubmitmessage",
      },
      {
        title: "Block Phone",
        icon: "close-circle",
        path: "/phonequery/blockphone",
      },
      {
        title: "Unblock Phone",
        icon: "add-circle",
        path: "/phonequery/unblockphone",
      },
      {
        title: "Provider Log",
        icon: "archive",
        path: "/phonequery/providerlog",
      },
      {
        title: "Message Status",
        icon: "mail-unread",
        path: "/phonequery/messagestatus",
      },
    ],
  },

  {
    title: "Complex",
    icon: "construct",
    children: [
      {
        title: "Route Change",
        icon: "swap-horizontal",
        path: "/complex/routechange",
      },
      {
        title: "Provider Profit",
        icon: "diamond",
        path: "/complex/providerprofit",
      },
    ],
  },

  {
    title: "Broadcasts",
    icon: "radio",
    children: [
      {
        title: "Broadcasts",
        icon: "radio-outline",
        path: "/broadcasts",
      },
    ],
  },

  {
    title: "Client",
    icon: "person",
    children: [
      { title: "Client", icon: "person", path: "/client" },
      {
        title: "Daily Balance",
        icon: "cash-outline",
        path: "/client/dailybalance",
      },
      { title: "Payments", icon: "card", path: "/client/payments" },
      {
        title: "Client Routing",
        icon: "people",
        path: "/client/clientrouting",
      },
      {
        title: "Network Coverage",
        icon: "wifi-outline",
        path: "/client/networkcoverage",
      },
    ],
  },

  {
    title: "SMPP",
    icon: "id-card",
    children: [{ title: "providers", icon: "basket", path: "/smpp/providers" }],
  },

  {
    title: "Queue",
    icon: "albums-outline",
    children: [
      {
        title: "Sms-send-queues",
        icon: "paper-plane-outline",
        path: "/queue/smssendqueues",
      },
      {
        title: "Sms-failed-queues",
        icon: "alert-circle-outline",
        path: "/queue/smsfailedqueues",
      },
    ],
  },

  {
    title: "ESME",
    icon: "layers-outline",
    children: [
      {
        title: "Clients",
        icon: "git-network-outline",
        path: "/esme/esmeclients",
      },
    ],
  },
];
