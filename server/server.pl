#!/usr/bin/perl
use warnings;
use strict;

use CGI;
use MIME::Lite;
use JSON;

my $q = CGI->new();

print "Content-type:application/json\r\n\r\n";
eval {
	my $data = $q->param('POSTDATA') || die "No data provided.\n";
	my $json = decode_json($data) or die "Unable to decode JSON package.\n";
	
	my $fullname = $json->{fullname} || '<fullname>';
	my $email = $json->{email} or die "No email address provided\n";
	my $subject = $json->{subject} || '<subject>';
	my $message = $json->{message} or die "No message provided\n";

	my $to = 'solutions@ambervoid.co.uk';
	my $from = 'solutions@ambervoid.co.uk';
	my $emailsubject = "IMPORTANT: RECEIVED ENQUIRY";
	my $emailmessage = "From: '$fullname'\nEmail: '$email'\nSubject: '$subject'\nMessage:\n---\n'$message'";

	my $msg = MIME::Lite->new(To => $to, Subject => $emailsubject, Data => $emailmessage);
	$msg->send('sendmail', '/usr/lib/sendmail -t -oi -oem') or die "Couldn't send mail\n";
};

if($@) {
	my $error = $@;
	$error =~ s/\n/ /g;
	print "{ \"error\" : \"$error\" }";
} else {
	print "{ \"success\" : \"Message sent successfully.\" }";
}
print "\n";

1;
