
# SCHEMEWISE

### Health Scheme Discovery, Eligibility Guidance and Health Camp Awareness

SchemeWise is a web-based social-benefit platform designed to make healthcare-support information easier to discover and understand.

The platform brings together health scheme discovery, potential eligibility guidance, health camp awareness, and category-based assistance into a single user-friendly application.

---

## 🌐 Project Overview

Finding information about government health schemes and public healthcare support can be difficult because information is often distributed across different sources.

SchemeWise addresses this problem by providing a centralized platform where users can:

- Check potential eligibility for health schemes
- Discover government health schemes
- Search and filter schemes
- Explore health camps
- Find support based on their needs
- View scheme benefits and eligibility conditions
- Understand required documents and application procedures
- Access official sources for verification

SchemeWise is designed as an information and guidance platform. It does **not** provide official government eligibility decisions or medical diagnosis.

---

## 🎯 Objectives

The main objectives of SchemeWise are:

1. Simplify the discovery of government health schemes.
2. Provide basic potential eligibility guidance.
3. Explain scheme benefits and eligibility conditions clearly.
4. Provide application guidance.
5. Improve awareness of health camps.
6. Guide users according to the type of support they need.
7. Connect users with official information sources.
8. Reduce unnecessary collection of personal information.
9. Demonstrate the application of computer science concepts to a social-benefit problem.

---

# 📦 Project Modules

SchemeWise consists of five major user-facing modules.

## 1. 🏠 Home Module

The Home module acts as the main entry point to the application.

### Functions

- Introduces SchemeWise 
- Provides navigation to major services
- Directs users to:
  - Eligibility Checker
  - Health Scheme Directory
  - Health Camps
  - Find Help

---

## 2. ✅ Eligibility Checker Module

The Eligibility Checker is one of the core modules of SchemeWise.

Users provide basic information, which is compared against predefined eligibility rules.

### Input Information

- Age
- Gender
- State
- Income range
- Occupation
- Family-related information where required

### Processing

The system:

1. Accepts user information.
2. Validates the input.
3. Compares the information with scheme eligibility rules.
4. Identifies potentially relevant schemes.
5. Displays the potential matches.

### Example Logic

```text
IF age matches
AND state is covered
AND income condition is satisfied
AND occupation matches
THEN
    Display scheme as a potential match
