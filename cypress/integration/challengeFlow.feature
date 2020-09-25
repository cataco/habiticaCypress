Feature: guildFlow

Background:
  Given I login
  Then I see main page

Scenario: Join public challenge
  Given I navigate to public challenges
  Then I join a public challenge and see the tasks in my tasks dashboard

Scenario: Leave public challenge
  Given I navigate to my challenges
  When I select the challenge I joined
  Then I can leave the public challenge
  Then I do not see tasks from public challegne have been added to the tasks dashboard

Scenario: Search Public Challenge using keywords
  Given I navigate to public challenges
  When I search for public challenge "Vote for Alaska!"
  Then I should see challenge "Vote for Alaska!" as first in the list