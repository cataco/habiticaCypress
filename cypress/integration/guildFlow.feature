Feature: guildFlow

Background:
  Given I login
  Then I see main page

Scenario: See list of my Guilds
  Given I navigate to My Guilds
  Then I can see the empty guilds dashboard

Scenario: Create new guild without gems
  Given I navigate to My Guilds
  Given I create a new guild with data:
  | Cucumber Guild  | Guild foo Cucumber | Guild description - cucumber |
  Then I can see an alert beacuse I do not have enough gems
  And  I can see the empty guilds dashboard
